import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import API from "../../components/utils/API";
import shorten from "../../components/utils/shorten";
import { Link } from "react-router-dom";
import "../style.css";

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
      let rev = result.data.reverse();
      setTopics(rev);
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
            <Link to="/forums/" >
              <h5><span className="link">Back to Forums</span></h5>
            </Link>
          </div>
          <div className="col-sm-6 text-right">
            <Link to={"/forums/" + category[1] + "/post/topic"} >
              <h5><span className="link">Post New Topic</span></h5>
            </Link>
          </div>
        </div>
        {topics.map(element => (
          <div key={element.id}>
            <div className="card noBorder">
              <div className="card-header colorHeader">
                <h3>{element.title}</h3>
              </div>
              <div className="card-body colorBody">
                <div>
                  {shorten(element.description, 250)}
                </div>
                <br></br>
              </div>
              <div className="card-footer colorFooter forumFooter">
                <div className="row">
                  <div className="col-sm-6">
                    <p className="noMargin">Posted by: {element.User.userName}</p>
                  </div>
                  <div className="col-sm-6 text-right noMargin">
                    <Link to={{
                      pathname: "/forums/" + category[1] + "/" + element.title,
                      state: {
                        topic: element
                        }
                      }} >
                      <h5 className="noMargin">Comments</h5> {/* Add comment numbers after comment section complete */}
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