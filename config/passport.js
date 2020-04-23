var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Use a Local Strategy, want login with a email and password
passport.use(new LocalStrategy(
	{
		usernameField: "email"
	},
	function(email, password, done) {
		db.User.findOne({
			where: {
				email: email
			}
	}).then(function(dbUser) {
		if (!dbUser) {
			dbUser = "Incorrect email.";
		}
		else if (!dbUser.validPassword(password)) {
		  dbUser = "Incorrect password.";
    }
		return done(null, dbUser);
	});
	}
));

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(user, cb) {
	cb(null, user);
});

module.exports = passport;