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

  getTopics: function(category) {
    return axios.get("/api/topics/" + category);
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

  newTopic: function(data) {
    return axios.post("/api/topic", data); 
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