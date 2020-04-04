import axios from "axios";

// axios.defaults.withCredentials = true

export default {
  // gets all current users data
  getUsers: function() {
    return axios.get("http://localhost:3001/api/user", { withCredentials: true });
  },

  // gets the current users data
  getUser: function(userName) {
    return axios.get("http://localhost:3001/api/user/" + userName, { withCredentials: true });
  },

  getTopics: function(category) {
    return axios.get("http://localhost:3001/api/topics/" + category);
  },

  // checks a user logining in
  loginCheck: function(postData) {
    return axios.post("http://localhost:3001/api/login", postData);
  },

  // Saves a new user to the database
  newUser: function(postData) {
    return axios.post("http://localhost:3001/api/register", postData); 
    //trying to find in 3000 not 3001 (server), have to find a way not to hard code it
  }
};