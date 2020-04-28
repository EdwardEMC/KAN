import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import API from "../components/utils/API";
import UserCard from "../components/UserCard";

class Search extends Component {
  state = {
    search: "",
    results: []
  };

  handleInputChange = event => {
    let value = event.target.value;

    this.setState({
      search: value
    });
  };

  findUsers = event => {
    event.preventDefault();

    API.onlineUsers(this.state.search)
    .then(result => {
      // console.log(result);
      this.setState({
        results: result.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
      <Wrapper>
        <br></br>
          <form onSubmit={this.findUsers} className="form d-flex justify-content-center">
            <input
              value={this.state.search}
              name="SearchParam"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Search..."
            />
            <button type="submit" className="btn btn-info">Search</button>
          </form>
          <br></br>
          {this.state.results.map(user => {
            return <UserCard key={user.id} info={user} />
          })}
      </Wrapper>
    )
  }
}
  
export default Search;