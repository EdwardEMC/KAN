var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // route to return a list of all users
  app.get("/api/user", function(req, res) {
    db.User.findAll({ }).then(function(dbUser) {
        res.json(dbUser);
    })
  });

  // route to get data about a particular user
  app.get("/api/user/id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.session.passport.user.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    })
	});

	// route to POST a new user
	app.post("/api/register", function(req, res) {
    console.log(req.body);
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

  // logging in a user
  app.post("/api/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.redirect('/'); 
      }
      req.logIn(user, function(err) {
        if (err) { 
          return next(err); 
        }
        return res.redirect('/profile');
      });
    })(req, res, next);
  });
};