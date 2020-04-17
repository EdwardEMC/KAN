const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

// Authentication requirements
const session = require("express-session");
const passport = require("./config/passport");

// Requiring our models for syncing
const db = require("./models");

// Setting up the authentication
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

// Socket.io configuration
io.on('connection', function(socket){

  var room = socket.handshake['query']['r_var'];
  
  // Only join a room if the user clicks a chatbox
  if(room !== "undefined") {
    console.log(room, "ROOM");

    socket.join(room);
    console.log('user joined room #'+room);

    socket.on('disconnect', function() {
      socket.leave(room)
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      io.to(room).emit('chat message', msg);
    });
  }
  else {
    return;
  }
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});