import React from "react";
import Wrapper from "../../components/Wrapper";
import { useHistory } from "react-router-dom";
import API from "../../components/utils/API";
import { Link } from "react-router-dom";

const PostTopic = () => {
  let history = useHistory();

  // Getting previous topic location for history push (always going to be the same http layout)
  const forum = window.location.href.split("/post/");
  const topic = forum[0].split("/forums/")

  const submitTopic = (event) => {
    event.preventDefault();

    document.getElementById("missingTitle").innerHTML = "";
    document.getElementById("missingDescription").innerHTML = ""

    // Getting references from inputs
    var titleInput = document.getElementById("title-input").value;
    var descriptionInput = document.getElementById("description-input").value;
    
    const data = {
      title: titleInput,
      description: descriptionInput,
      category: topic[1]
    }

    if(data.title === "" || data.title === "Topic needs title") {
      document.getElementById("missingTitle").innerHTML = "Topic needs title";
      return;
    }

    if(data.description === "" || data.description === "Topic needs description") {
      document.getElementById("missingDescription").innerHTML = "Topic needs description";
      return;
    }

    API.newTopic(data)
    .then(function(result) {
      console.log(result);
      history.push("/forums/" + topic[1]);
    })
    .catch(function(err) {
      console.log(err);
    })
  };

  return (
    <Wrapper>
      <br></br>
      <div className="container">
        <Link to={"/forums/" + topic[1]} >
          <h5>Back</h5>
        </Link>
        <div className="card">
          <div className="card-header text-center colorHeader">
            New Topic
          </div>
          <div className="card-body colorBody">
            <form className="posttopic">
              <br></br>
              <div className="form-group">
                <label htmlFor="title-input">Title</label>
                <input id="title-input" className="input form-control" type="text" required placeholder="Topic title..."/>
                <p id="missingTitle"></p>
              </div>
              <div className="form-group">
                <label htmlFor="description-input">Description</label>
                <textarea id="description-input" className="input form-control" type="text" required placeholder="Text goes here..."/>
                <p id="missingDescription"></p>
              </div>
              <br></br>
              <div className="text-center">
                <button onClick={submitTopic} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default PostTopic;