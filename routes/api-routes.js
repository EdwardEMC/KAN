var db = require("../models");
// var passport = require("../config/passport");

module.exports = function(app) {
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
};