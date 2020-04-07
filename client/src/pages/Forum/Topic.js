import React, { useState, useEffect } from "react";
import API from "../../components/utils/API";
import Wrapper from "../../components/Wrapper";
import PostComment from "../../components/PostComment";
import { Link } from "react-router-dom";

const Topic = (props) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    loadComments()
  }, [PostComment])

  function loadComments() {
    API.getComments(props.location.state.topic.id)
    .then(function(result) {
      setComments(result.data);
    })// If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

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
            {/* <Link to={"/forums" + topic[1] + "/post/comment"} >
              <p>Post New Comment</p>
            </Link> */} {/* make this a link to the comment box below the title */}
          </div>
        </div>
        <div key={props.location.state.topic.id}>
          <div className="card">
            <div className="card-header colorHeader">
              <div className="row">
                <div className="col-sm-6">
                  <h3>{props.location.state.topic.title}</h3>
                </div>
                <div className="col-sm-6 text-right">
                  <p>Posted by: {props.location.state.topic.User.userName}</p>
                </div>
              </div>
            </div>
            <div className="card-body colorBody">
              <div>
                {props.location.state.topic.description} {/* Limit to certain amount of letters show full description when expanded */}
              </div>
              <br></br>
            </div>
          </div>
          <br></br>
        </div>
        <div className="container">
          {comments.map(element => (
          <div key={element.id}>
            <div className="card">
              <div className="card-header colorFooter">
                <div className="row">
                  <div className="col-sm-6">
                    <h5>{element.User.userName}</h5>
                  </div>
                  <div className="col-sm-6 text-right">
                    <p>Posted at: {element.createdAt}</p> {/* refine this */}
                  </div>
                </div>
              </div>
              <div className="card-body colorBody">
                <div>
                  {element.description}
                </div>
                <br></br>
              </div>
            </div>
            <br></br>
          </div>
          ))}
          <br></br>
          {/* adding a comment to the topic */}
          <PostComment id={props.location.state.topic.id}/>
        </div>
      </div>  
    </Wrapper>
  )
}
  
export default Topic;