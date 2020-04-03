import axios from "axios";

export default {
  // Saves a new user to the database
  newUser: function(postData) {
    // gets this far and then cannot connect to back end (cannot find /api/register)
    return axios.post("http://localhost:3001/api/register", postData); //trying to find in 3000 not 3000 (server)
  }
};