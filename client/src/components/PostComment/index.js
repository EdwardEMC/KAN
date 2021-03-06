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
      // console.log(result);
      document.getElementById("description-input").value = "";
      document.getElementById("missingDescription").value = "";
      props.onClick();
    })
    .catch(function(err) {
      console.log(err);
    })
  };

  return (
    <div>
      <div className="card noBorder">
        <div className="card-header text-center colorHeaderComment">
          <h5>New Comment</h5>
        </div>
        <div className="card-body colorBodyComment">
          <form className="posttopic" onSubmit={submitComment}>
            <div className="form-group">
              <textarea id="description-input" className="input form-control inputColor noBorder" type="text" required placeholder="Text goes here..."/>
              <p id="missingDescription"></p>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    <br></br>
    </div>
  )
}

export default PostComment;