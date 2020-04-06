import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import API from "../../components/utils/API";
import { Link } from "react-router-dom";

const Subforum = () => {
  const [topics, setTopics] = useState([])
  const category = window.location.href.split("forums/");

  useEffect(() => {
    getTopics()
  }, [])

  function getTopics() {
    const category = window.location.href.split("forums/");
    API.getTopics(category[1])
    .then(function(result) {
      setTopics(result.data);
    })// If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  console.log(topics, "USER")

  return (
    <Wrapper>
      <div className="container">
        <br></br>
        <div className="row">
          <div className="col-sm-6">
            <Link to="/forums/" >
              <p>Back to Forums</p>
            </Link>
          </div>
          <div className="col-sm-6 text-right">
            <Link to={"/forums/" + category[1] + "/post/topic"} >
              <p>Post New Topic</p>
            </Link>
          </div>
        </div>
        {topics.map(element => (
          <div key={element.id}>
            <div className="card">
              <div className="card-header">
                <h3>{element.title}</h3>
              </div>
              <div className="card-body">
                <div>
                  {element.description} {/* Limit to certain amount of letters show full description when expanded */}
                </div>
                <br></br>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-sm-6">
                    <p>Posted by: {element.User.userName}</p>
                  </div>
                  <div className="col-sm-6 text-right">
                    <Link to={{
                      pathname: "/forums/" + category[1] + "/" + element.title,
                      state: {
                        topic: element
                        }
                      }} >
                      <p>Comments</p> {/* Add comment numbers after comment section complete */}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
  
export default Subforum;