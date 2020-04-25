import React, { useState, useEffect } from "react";
import API from "../../components/utils/API";
import Wrapper from "../../components/Wrapper";
import PostComment from "../../components/PostComment";
import { Link } from "react-router-dom";

const Topic = (props) => {
  const [comments, setComments] = useState([])
  const [user, setUser] = useState();

  useEffect(() => {
    loadComments()
    // eslint-disable-next-line
  }, [])

  function loadComments() {
    API.getComments(props.location.state.topic.id)
    .then(function(result) {
      setUser(result.data.user);
      setComments(result.data.comments);
    })// If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  function deleteComment(event) {
    const created = event.target.parentElement.getAttribute("value")
    API.deleteComment(created)
    .then(function(result) {
      console.log(result);
      const placeList = [];
      comments.map(element => {
        if(element.createdAt !== created) {
          return placeList.push(element);
        } 
        return true;
      });
      setComments(placeList);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  function editSubmit(data) {
    API.editComment(data)
    .then(function(result) {
      loadComments();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  function editComment(event) {
    const commentId = event.target.parentElement.getAttribute("data-id");
    document.getElementById('editDescription'+commentId).className="show";
    document.getElementById('description'+commentId).className="hide";
  }

  function submitEdit(event) {
    const commentId = event.target.getAttribute("data-id");
    const created = event.target.getAttribute("data-created");
    const edited = document.getElementById('editbox'+commentId).value.trim()
    if(edited !== "") {
      const data = {
        edit: edited,
        time: created
      }
      editSubmit(data);
    }
    else {
      return document.getElementById('editbox'+commentId).value = "**Comment cannot be blank**";
    }
    
    document.getElementById('editDescription'+commentId).className="hide";
    document.getElementById('description'+commentId).className="show";
  }

  return (
    <Wrapper>
      <div className="container">
        <br></br>
        <div className="row">
          <div className="col-sm-6">
            <Link to={"/forums/" + props.match.params.handle} >
              <h5>Back</h5>
            </Link>
          </div>
          <div className="col-sm-6 text-right">
            {/* https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/focus */}
            {/* <Link to={"/forums" + topic[1] + "/post/comment"} >
              <p>Post New Comment</p>
            </Link> */}
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
                  <div id={"description" + element.id} className="show">
                    {element.description}
                  </div>
                  <div id={"editDescription" + element.id} className="hide">
                    <textarea id={"editbox" + element.id} style={{width:"100%"}} defaultValue={element.description}>
                      {/*Area for edited comment*/}
                    </textarea>
                    <button data-id={element.id} data-created={element.createdAt} onClick={submitEdit}>Submit</button>
                  </div>
                  <br></br>
                  {user === element.User.id ? 
                    <div className="text-right" data-id={element.id} value={element.createdAt}>
                      <span id="edit" className="pointer" onClick={editComment}>Edit</span>
                      &emsp;
                      <span id="delete" className="pointer" onClick={deleteComment}>Delete</span>
                    </div> 
                    : 
                    null
                  }
                </div>
              </div>
              <br></br>
            </div>
          ))}
          <br></br>
          {/* adding a comment to the topic */}
          <PostComment id={props.location.state.topic.id} onClick={loadComments}/>
        </div>
      </div>  
    </Wrapper>
  )
}
  
export default Topic;