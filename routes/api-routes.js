const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // route to return a list of all users
  app.get("/api/user", function(req, res) {
    db.User.findAll({ }).then(function(dbUser) {
      res.json(dbUser);
    })
  });

  // route to get data about a particular user
  app.get("/api/user/id", function(req, res) { // add isAuthenticated, when it is working
    console.log(req.session);
    console.log("here");
    console.log(req.sessionID);
    console.log(req.user);
    // db.User.findOne({
    //   where: {
    //     id: req.user
    //   }
    // }).then(function(dbUser) {
    // res.json(dbUser);
    // })
  });
  
  // route to return a list of all topics relating to subforum
  app.get("/api/topics/:category", function(req, res) {
    console.log(req.params.category);
    // db.Topic.findAll({ 
    //   where: {
    //     category: req.params.category
    //   }
    // }).then(function(dbTopic) {
    //     res.json(dbTopic);
    // })
  });

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
  
  // example of checking authentication
  // app.get('/authrequired', (req, res) => {
  //   if(req.isAuthenticated()) {
  //     res.send('you hit the authentication endpoint\n')
  //   } else {
  //     res.redirect('/')
  //   }
  // })

  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      req.login(user, (err) => {
        return res.send('You were authenticated & logged in!\n');
      })
    })(req, res, next);
  })
  
};