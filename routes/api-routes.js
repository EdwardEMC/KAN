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
};