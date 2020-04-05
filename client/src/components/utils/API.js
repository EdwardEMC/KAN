import axios from "axios";

// axios.defaults.withCredentials = true

export default {
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

  // checks a user logining in
  loginCheck: function(postData) {
    return axios.post("/api/login", postData);
  },

  // Saves a new user to the database
  newUser: function(postData) {
    return axios.post("/api/register", postData); 
    //trying to find in 3000 not 3001 (server), have to find a way not to hard code it
  }
};