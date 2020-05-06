const db = require("../models");
const { Op } = require("sequelize");
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //===========================================================================
  // GET REQUESTS
  //===========================================================================

  // route to verify user
  app.get('/api/verify', (req, res) => {
    if(req.user.category === "Admin") {
      res.send("Admin");
    }
    else {
      if(req.isAuthenticated()) {
        const token = jwt.sign({user: "LoggedIn"}, "Sandwich"); //change privateKey to process.env later
        res.send(token);
      } else {
        res.send(false);
      }
    }
  })

  // route to return a list of all users
  app.get("/api/user", isAuthenticated, function(req, res) {
    db.User.findAll({ }).then(function(dbUser) {
      res.json(dbUser);
    })
  });

  // route to get data about the logged in user
  app.get("/api/user/id", isAuthenticated, function(req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    })
  });
  
  // route to get data about a particular user
  app.get("/api/user/:userName", isAuthenticated, function(req, res) {
    db.User.findOne({
      where: {
        userName: req.params.userName,
        lat: {
          [Op.not]: null // can only view if the user is online
        }
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    })
  });

  // route to return a list of all topics relating to subforum
  app.get("/api/topics/:category", isAuthenticated, function(req, res) {
    db.Topic.findAll({ 
      where: {
        category: req.params.category
      },
      include: [db.User]
    }).then(function(data) {
      res.json(data);
    })
  });

  // route to return a list of all comment relating to a topic
  app.get("/api/comments/:TopicId", isAuthenticated, function(req, res) {
    db.Comment.findAll({ 
      where: {
        TopicId: req.params.TopicId
      },
      include: [db.User]
    }).then(function(dbComment) {
      const data = {
        comments: dbComment,
        user: req.user.id
      }
      res.json(data);
    })
  });

  // route to get all markers
  app.get("/api/markers", isAuthenticated, function(req, res) {
    db.PoI.findAll({include: [db.User]}).then(function(dbPoI) { 
      db.User.findAll({
        where: {
          lat: {
            [Op.not]: null
          }
        }
      }).then(function(dbUser) {
        const data = dbPoI.concat(dbUser);
        res.json(data);
      })
    })
  });

  app.get("/api/chats", isAuthenticated, function(req, res) {
    db.Chats.findAll({ 
      include: [db.Messages],
      where: {
        [Op.or]: 
          [{
            user1: req.user.userName
          }, 
            {
            user2: req.user.userName
          }]
      }
    }).then(function(dbChats) {
      data = {
        chats: dbChats,
        logged: req.user
      }
      res.json(data);
    })
  });

  //route to get messages from a certain chat
  app.get("/api/messages/:id", isAuthenticated, function(req, res) {
    db.Messages.findAll({
      where: {
        ChatId: req.params.id
      }
    })
    .then(function(dbMessages) {
      const data = {
        id: req.user.id,
        messages: dbMessages
      }
      res.json(data);
    })
  });

  // route to get all users PoI's
  app.get("/api/users/places", isAuthenticated, function(req, res) {
    db.PoI.findAll({
      where: {
        UserId: req.user.id
      }
    })
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      console.log(err);
    })
  })

  // route to get all users posted topics
  app.get("/api/users/topics", isAuthenticated, function(req, res) {
    db.Topic.findAll({
      where: {
        UserId: req.user.id
      }
    })
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      console.log(err);
    })
  })

  // logging out a user
  app.get("/logout", isAuthenticated, function(req, res) {
    // db.User.update({ lat: null, lng: null }, { // removes online marker
    db.User.update({}, { // removes online marker
      where: {
        email: req.session.passport.user.email
      }
    })
    // All ready to go, just keeping like this while testing
    // .then(function(){
    //   db.Chats.destroy({ 
    //     where: {
    //       [Op.or]: 
    //         [{
    //           user1: req.user.userName
    //         }, 
    //           {
    //           user2: req.user.userName
    //         }]
    //     }
    //   })
    // })
    .then(function() {
      console.log("User logged Out");
      req.logout();
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.log(err);
    })
  });

  app.get("/api/admin", isAuthenticated, function(req, res) {
    db.Topic.findAll({}).then(function(dbTopic) {
      db.PoI.findAll({}).then(function(dbPoI) {
        db.Comment.findAll({}).then(function(dbComment) {
          const data = {
            topic: dbTopic,
            poi: dbPoI,
            comment: dbComment
          }
          res.json(data);
        })
      })
    })
  });

  // route to get online users
  app.get("/api/online/:userName", isAuthenticated, function(req, res) {
    db.User.findAll({
      where: {
        userName: {
          [Op.substring]: "%"+req.params.userName+"%",
        },
        lat: {
          [Op.not]: null // can only view if the user is online
        }
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    })
  });
  
  //===========================================================================
  // POST REQUESTS
  //===========================================================================

  // route to authenticate user logging in
  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      req.login(user, (err) => {
        if(err) {
          return err;
        }
        return res.send(user);
      })
    })(req, res, next);
  })

	// route to POST a new user
	app.post("/api/register", function(req, res) {
    db.User.create({
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      generalInformation: req.body.generalInformation, 
      icon: "Default",
      password: req.body.password,
  })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.json(err.errors[0].message);
      // res.status(401);
    });
  });

  // route to POST a new topic
	app.post("/api/topic", isAuthenticated, function(req, res) {
    db.Topic.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      UserId: req.user.id
  })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.sendStatus(401).json(err);
    });
  });

  // route to POST a new topic
	app.post("/api/topic/comment", isAuthenticated, function(req, res) {
    db.Comment.create({
      description: req.body.description,
      TopicId: req.body.topicId,
      UserId: req.user.id
    })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.sendStatus(401).json(err);
    });
  });

  // route to POST a new PoI marker
	app.post("/api/user/PoI", isAuthenticated, function(req, res) {
    db.PoI.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      lat: req.body.lat,
      lng: req.body.lng,
      UserId: req.user.id
    })
    .then(function() {
      console.log("Successfully set Marker");
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.sendStatus(401).json(err);
    });
  });

  // route to post a new chat box
  app.post("/api/user/chats", isAuthenticated, function(req, res) {
    const data = [req.body.currentUser.userName, req.user.userName];
    // alpha sort the usernames so they are always the same
    const sortedData = data.sort().join("-");

    db.Chats.create({
      chatName: sortedData,
      user1: req.body.currentUser.userName,
      user2: req.user.userName
    })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      res.sendStatus(401).json(err);
    });
  })

  //route to update the message history of a chat
  app.post("/api/messages", isAuthenticated, function(req, res) {
    const data = {
      message: req.body.message,
      ChatId: req.body.id,
      UserId: req.user.id
    }
    // console.log(data, "SERVER API");
    db.Messages.create({
      message: req.body.message,
      ChatId: req.body.id,
      UserId: req.user.id
    })
    .then(function() {
      res.status(200).end();
    })
    .catch(function(err) {
      console.log(err);
      res.status(401).json(err);
    });
  });

  //===========================================================================
  // PUT REQUESTS
  //===========================================================================

  // route to PUT (update) a user
  app.put("/api/user", isAuthenticated, function(req, res) {
    db.User.update({
      icon: req.body.icon,
      phone: req.body.phone,
      name: req.body.name,
      generalInformation: req.body.generalInformation
    },
    {
      where: {
        id: req.user.id
      }
    })
    .then(function() {
      console.log("Successfully updated user");
      res.status(200).end();
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
  });

  // route to PUT (update) a user's online marker (lat, lng)
  app.put("/api/user/online", isAuthenticated, function(req, res) {
    db.User.update({
      lat: req.body.lat,
      lng: req.body.lng,
    },
    {
      where: {
        id: req.user.id
      }
    })
    .then(function() {
      console.log("User is now online");
      res.status(200).end();
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
  });

  //route to edit a comment
  app.put("/api/comment/edit", isAuthenticated, function(req, res) {
    db.Comment.update({
      description: req.body.edit
    },
    {
      where: {
        createdAt: req.body.time,
        UserId: req.user.id
      }
    })
    .then(function() {
      res.status(200).end();
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
  });

  //route to edit either myTopics or myPlaces list item
  app.put("/api/list/edit", isAuthenticated, function(req, res) {
    if(req.body.type === "Topics") {
      db.Topic.update({
        title: req.body.editT,
        description: req.body.editD
      },
      {
        where: {
          createdAt: req.body.time,
          UserId: req.user.id
        }
      })
      .then(function() {
        res.status(200).end();
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
    }
    else {
      db.PoI.update({
        title: req.body.editT,
        description: req.body.edit
      },
      {
        where: {
          createdAt: req.body.time,
          UserId: req.user.id
        }
      })
      .then(function() {
        res.status(200).end();
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
    }
  });

  //route to go offline
  app.put("/api/offline", isAuthenticated, function(req, res) {
    db.User.update({ lat: null, lng: null }, { // removes online marker
      where: {
        email: req.session.passport.user.email
      }
    })
    .then(function() {
      res.send("User has gone offline");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
  });
  
  //===========================================================================
  // DELETE REQUESTS
  //===========================================================================

  //route to delete a user
  app.delete("/api/user", isAuthenticated, function(req, res) {
    var id = req.user.id;
    db.User.destroy({
      where: {
        id: id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //route to delete chatbox
  app.delete("/api/chat/:chatName", isAuthenticated, function(req, res) {
    db.Chats.destroy({
      where: {
        chatName: req.params.chatName
      }
    }).then(function(dbChats) {
      res.json(dbChats);
    });
  });

  //route to delete comment
  app.delete("/api/comments/:comment", isAuthenticated, function(req, res) {
    db.Comment.destroy({
      where: {
        createdAt: req.params.comment,
        UserId: req.user.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  //route to delete topic
  app.delete("/api/topics/:topic", isAuthenticated, function(req, res) {
    db.Topic.destroy({
      where: {
        createdAt: req.params.topic,
        UserId: req.user.id
      }
    }).then(function(dbChats) {
      res.json(dbChats);
    });
  });

  //route to delete PoI
  app.delete("/api/places/:place", isAuthenticated, function(req, res) {
    db.PoI.destroy({
      where: {
        createdAt: req.params.place,
        UserId: req.user.id
      }
    }).then(function(dbChats) {
      res.json(dbChats);
    });
  });

  //route to delete PoI
  app.delete("/api/delete/:database/:title/:UserId", isAuthenticated, function(req, res) {
    switch(req.params.database) {
      case "topic":
        db.Topic.destroy({
          where: {
            createdAt: req.params.title,
            UserId: req.params.UserId
          }
        }).then(function(dbChats) {
          res.json(dbChats);
        });
        break;
      case "comment":
        db.Comment.destroy({
          where: {
            createdAt: req.params.title,
            UserId: req.params.UserId
          }
        }).then(function(dbChats) {
          res.json(dbChats);
        });
        break;
      case "poi":
        db.PoI.destroy({
          where: {
            createdAt: req.params.title,
            UserId: req.params.UserId
          }
        }).then(function(dbChats) {
          res.json(dbChats);
        });
        break;
      default:
        return;
    }
  });
};