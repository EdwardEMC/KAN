const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //===========================================================================
  // GET REQUESTS
  //===========================================================================

  // route to return a list of all users
  app.get("/api/user", function(req, res) {
    db.User.findAll({ }).then(function(dbUser) {
      res.json(dbUser);
    })
  });

  // route to get data about a particular user
  app.get("/api/user/id", function(req, res) { // add isAuthenticated, when it is working
    // console.log(req.session);
    // console.log(req.sessionID);
    // console.log(req.user);
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then(function(dbUser) {
    res.json(dbUser);
    })
  });
  
  // route to return a list of all topics relating to subforum
  app.get("/api/topics/:category", function(req, res) {
    console.log(req.params.category);
    db.Topic.findAll({ 
      where: {
        category: req.params.category
      },
      include: [db.User]
    }).then(function(dbTopic) {
      res.json(dbTopic);
    })
  });

  //===========================================================================
  // POST REQUESTS
  //===========================================================================

	// route to POST a new user
	app.post("/api/register", function(req, res) {
    db.User.create({
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      generalInformation: req.body.generalInformation,      
      password: req.body.password,
  })
    .then(function() {
      res.status(200);
      res.redirect('/');
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
  });

  // route to POST a new topic
	app.post("/api/topic", function(req, res) {
    console.log("here");
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

  // route to authenticate user logging in
  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      req.login(user, (err) => {
        if(err) {
          return err;
        }
        return res.send('You were authenticated & logged in!\n');
      })
    })(req, res, next);
  })

  //===========================================================================
  // PUT REQUESTS
  //===========================================================================

  // route to PUT (update) a user
  app.put("/api/user", function(req, res) {
    db.User.update({
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
  
  //===========================================================================
  // DELETE REQUESTS
  //===========================================================================

  //route to delete a user
  app.delete("/api/user", function(req, res) {
    var id = req.user.id;
    db.User.destroy({
        where: {
          id: id
        }
    }).then(function(dbUser) {
        res.json(dbUser);
    });
  });
};


// example of checking authentication
// app.get('/authrequired', (req, res) => {
//   if(req.isAuthenticated()) {
//     res.send('you hit the authentication endpoint\n')
//   } else {
//     res.redirect('/')
//   }
// })