import React, { useState, useEffect } from "react";
import API from "../../components/utils/API";
import Wrapper from "../../components/Wrapper";
import PostComment from "../../components/PostComment";
import { Link } from "react-router-dom";

const Topic = (props) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments()
  }, [])

  function getComments() {
    API.getComments(props.location.state.topic.id)
    .then(function(result) {
      console.log(result);
      setComments(result.data);
    })// If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  console.log(props);
  const topic = window.location.href.split("/forums")
  
  return (
    <Wrapper>
      <div className="container">
        <br></br>
        <div className="row">
          <div className="col-sm-6">
            <Link to={"/forums/" + props.match.params.handle} >
              <p>Back</p>
            </Link>
          </div>
          <div className="col-sm-6 text-right">
            <Link to={"/forums" + topic[1] + "/post/comment"} >
              <p>Post New Comment</p>
            </Link>
          </div>
        </div>
        <div key={props.location.state.topic.id}>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-sm-6">
                  <h3>{props.location.state.topic.title}</h3>
                </div>
                <div className="col-sm-6 text-right">
                  <p>Posted by: {props.location.state.topic.User.userName}</p>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div>
                {props.location.state.topic.description} {/* Limit to certain amount of letters show full description when expanded */}
              </div>
              <br></br>
            </div>
          </div>
          <br></br>
        </div>
        <div className="container">
          {/* map function for all the comments */}
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-sm-6">
                  <h5>UserName</h5>
                </div>
                <div className="col-sm-6 text-right">
                  <p>Posted at: hh:ss dd/mm/yy</p>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div>
                Comment
              </div>
              <br></br>
            </div>
          </div>
          {/* adding a comment to the topic */}
          <br></br>
          <PostComment id={props.location.state.topic.id}/>
        </div>
      </div>  
    </Wrapper>
  )
}
  
export default Topic;