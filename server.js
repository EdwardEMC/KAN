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
  app.use(express.static("./client/build"));
}

const roomList = [];

// Socket.io configuration
io.on('connection', function(socket){
  let currentRoom;

  // if room list has two 'rooms' user leaves the first one
  if(roomList.length > 1) {
    socket.on("changeRoom", function() {      
      socket.leave(roomList[0]);
      console.log("user left room " + roomList[0]);
      roomList.shift();
    })
  }

  socket.on("join", function(room) {
    currentRoom = room;
    roomList.push(room);
    console.log(room, "TRYING TO JOIN");
    socket.join(room);
    console.log('user joined room #' + room);
  })
  
  socket.on('disconnect', function() {
    socket.leaveAll()
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log(msg);
    io.to(currentRoom).emit('chat message', msg);
  });
});

// Define API routes here
require("./routes/api-routes.js")(app);

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