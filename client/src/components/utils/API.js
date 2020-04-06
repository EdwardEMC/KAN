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

  // gets all topics relating to the subforum
  getTopics: function(category) {
    return axios.get("/api/topics/" + category);
  },

  // gets all comments about a certain topic
  getComments: function(TopicId) {
    return axios.get("/api/topics/comments", TopicId);
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

  //============================================
  // PUT REQUESTS
  //============================================

  // Updates a user on the database
  updateUser: function(data) {
    return axios.put("/api/user", data);
  },

  //============================================
  // DELETE REQUESTS
  //============================================

  // Deletes a user
  deleteUser: function() {
    return axios.delete("/api/user");
  }
};