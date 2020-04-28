import axios from "axios";

// axios.defaults.withCredentials = true

export default {
  //============================================
  // GET REQUESTS
  //============================================

  // verifies the current user
  verify: function() {
    return axios.get("/api/verify");
  },

  // gets all current users data
  getUsers: function() {
    return axios.get("/api/user", { withCredentials: true });
  },

  // gets the current users data
  getUser: function() {
    return axios.get("/api/user/id", { withCredentials: true });
  },

  // loads a users profile from the map
  getProfile: function(userName) {
    return axios.get("/api/user/" + userName);
  },

  // gets all topics relating to the subforum
  getTopics: function(category) {
    return axios.get("/api/topics/" + category);
  },

  // gets all comments about a certain topic
  getComments: function(TopicId) {
    return axios.get("/api/comments/" + TopicId);
  },

  // gets all current map markers
  getAllMarkers: function() {
    return axios.get("/api/markers");
  },

  // gets all active chats
  getChats: function() {
    return axios.get("/api/chats");
  },

  // gets all messages relating to the active chatbox
  getMessages: function(data) {
    return axios.get("/api/messages/" + data);
  },

  // gets all places marked by the current user
  getPlaces: function() {
    return axios.get("/api/users/places");
  },

  // gets all topics posted by the current user
  getUserTopics: function() {
    return axios.get("/api/users/topics");
  },

  // logs out the current user
  logOut: function() {
    return axios.get("/logout");
  },

  // gets the list of all topics, places and comments
  getAdminList: function() {
    return axios.get("/api/admin");
  },

  // gets the list of all online users
  onlineUsers: function(search) {
    // console.log(search);
    return axios.get("/api/online/" + search);
  },

  //============================================
  // POST REQUESTS
  //============================================

  // checks a user logining in
  loginCheck: function(data) {
    return axios.post("/api/login", data);
  },

  // Saves a new user to the database
  newUser: function(data) {
    return axios.post("/api/register", data); 
  },

  // Posting a new topic to a forum
  newTopic: function(data) {
    return axios.post("/api/topic", data); 
  },

  // Posting a comment to a topic
  newComment: function(data) {
    return axios.post("/api/topic/comment", data);
  },

  // sets the position of a place of interest
  setPoIMarker: function(data) {
    return axios.post("/api/user/PoI", data);
  },

  // creates a new chat entry
  newChat: function(data) {
    return axios.post("/api/user/chats", data);
  },

  // Updates the active chats message history
  sendMessage: function(data) {
    // console.log(data, "CLIENT API")
    return axios.post("/api/messages/", data);
  },

  //============================================
  // PUT REQUESTS
  //============================================

  // Updates a user on the database
  updateUser: function(data) {
    return axios.put("/api/user", data);
  },

  // Updates a user with their online marker
  setOnlineMarker: function(data) {
    return axios.put("/api/user/online", data);
  },

  // Updates a users comment
  editComment: function(data) {
    return axios.put("/api/comment/edit", data)
  },

  // Updates a users lat & lng to make them go offline
  offline: function() {
    return axios.put("/api/offline");
  },

  //============================================
  // DELETE REQUESTS
  //============================================

  // Deletes a user
  deleteUser: function() {
    return axios.delete("/api/user");
  },

  // Deletes a chatbox
  deleteChat: function(data) {
    return axios.delete("/api/chat/" + data.chatName);
  },

  // Deletes a comment
  deleteComment: function(data) {
    return axios.delete("/api/comments/" + data);
  },

  // Deletes a PoI
  deletePlace: function(data) {
    return axios.delete("/api/places/" + data);
  },

  // Deletes a topic
  deleteTopic: function(data) {
    return axios.delete("/api/topics/" + data);
  },

  // Admin can delete a topic, poi or comment
  deleteAdmin: function(data) {
    return axios.delete("/api/delete/" + data.database + "/" + data.title + "/" + data.user);
  }
};