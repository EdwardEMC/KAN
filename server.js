const express = require("express");
const path = require("path");
// const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();

// Complete but not implemented yet
const session = require("express-session");
const passport = require("./config/passport");

// Requiring our models for syncing
const db = require("./models");

// Complete but not implemented yet
app.use(session({ 
  secret: "keyboard user", 
  resave: true, 
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
require("./routes/api-routes.js")(app);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});