import React from "react";
import API from "../../components/utils/API";

function PostComment(props) {
  const submitComment = (event) => {
    event.preventDefault();
        
    document.getElementById("missingDescription").value = "";

    // Getting references from inputs
    var commentInput = document.getElementById("description-input").value;
    
    const data = {
      description: commentInput,
      topicId: props.id
    }

    if(commentInput === "") {
      document.getElementById("missingDescription").innerHTML = "Comment cannot be empty";
      return;
    }

    API.newComment(data)
    .then(function(result) {
      console.log(result);
      document.getElementById("description-input").value = "";
      document.getElementById("missingDescription").value = "";
      // history.push("/forums/" + topic[1]);
    })
    .catch(function(err) {
      console.log(err);
    })
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        New Comment
      </div>
      <div className="card-body">
        <form className="posttopic">
          <div className="form-group">
            <textarea id="description-input" className="input form-control" type="text" required placeholder="Text goes here..."/>
            <p id="missingDescription"></p>
          </div>
          <div className="text-center">
            <button onClick={submitComment} className="btn btn-primary">
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostComment;