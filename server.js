const express = require("express");
const path = require("path");
const compression = require("compression");
const PORT = process.env.PORT || 3001;
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

// Authentication requirements
const session = require("express-session");
const passport = require("./config/passport");

// Requiring our models for syncing
const db = require("./models");

// .env process set up
require('dotenv').config();

app.use(compression());

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

let activeSockets = [];

// area to put name spaces
// let nameSpaces = [];

io.on("connection", socket => {
  console.log(`User connected: ${socket.id}`);

  const existingSocket = activeSockets.find(
    existingSocket => existingSocket === socket.id
  );

  if (!existingSocket) {
    activeSockets.push({name: socket.handshake.query.name, socket: socket.id});
    socket.emit("update-user-list", {
      //crashes on none left
      users: activeSockets.filter(
        existingSocket => existingSocket.socket !== socket.id
      )
    });

    let data = {
      name: socket.handshake.query.name,
      socket: socket.id
    }

    socket.broadcast.emit("update-user-list", {
      users: [data]
    });
  }

  socket.on("call-user", (data) => {
    socket.to(data.to).emit("call-made", {
      offer: data.offer,
      socket: socket.id
    });
  });

  socket.on("make-answer", data => {
    socket.to(data.to).emit("answer-made", {
      socket: socket.id,
      answer: data.answer
    });
  });

  socket.on("reject-call", data => {
    socket.to(data.from).emit("call-rejected", {
      socket: socket.id
    });
  });

  socket.on("hang-up", data => {
    console.log(data);
    socket.to(data).emit("hang-up");
  });

  socket.on("disconnect", () => {
    activeSockets = activeSockets.filter(
      existingSocket => existingSocket.socket !== socket.id
    );
    socket.broadcast.emit("remove-user", {
      socketId: socket.id
    });

    socket.leaveAll();

    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("chat-message", data => {
    console.log(data);
    socket.to(data.to).emit("chat-sent", {
      msg: data,
      socket: socket.id
    });
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