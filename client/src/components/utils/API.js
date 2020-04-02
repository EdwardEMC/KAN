import axios from "axios";

export default {
  // Saves a new user to the database
  newUser: function(postData) {
    // gets this far and then cannot connect to back end (cannot find /api/register)
    return axios.post("/api/register", postData);
  }
};