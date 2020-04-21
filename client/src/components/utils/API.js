import axios from "axios";

// axios.defaults.withCredentials = true

export default {
  //============================================
  // GET REQUESTS
  //============================================

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

  getAllMarkers: function() {
    return axios.get("/api/markers");
  },

  getChats: function() {
    return axios.get("/api/chats");
  },

  getMessages: function(data) {
    return axios.get("/api/messages/" + data);
  },

  getPlaces: function() {
    return axios.get("/api/users/places");
  },

  getTopics: function() {
    return axios.get("/api/users/topics");
  },

  logOut: function(data) {
    return axios.get("/logout");
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

  setPoIMarker: function(data) {
    return axios.post("/api/user/PoI", data);
  },

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

  //============================================
  // DELETE REQUESTS
  //============================================

  // Deletes a user
  deleteUser: function() {
    return axios.delete("/api/user");
  }
};