import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../components/utils/API";
import Wrapper from "../components/Wrapper";
import ListView from "../components/ListView";

const MyTopics = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    loadTopics()
  }, [])

  function loadTopics() {
    API.getUserTopics()
    .then(function(result) {
      setList(result.data);
    }) // If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  function deleteTopic(event) {
    const title = event.target.getAttribute("data-title");
    // console.log(title);
    API.deleteTopic(title)
    .then(function(result) {
      console.log(result);
      const topicList = [];
      list.map(element => {
        if(element.title !== title) {
          return topicList.push(element);
        }
        return true;
      })
      setList(topicList);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  return (
    <Wrapper>
      <div className="container">
        <Link to="/profile">
          <h5>Back</h5>
        </Link>
        <h2 className="text-center">Topics</h2>
        <br></br>
        {list.map(element => {
          return <ListView key={element.id} info={element} onClick={deleteTopic}/>  
        })}
      </div>
    </Wrapper>
  )
}
  
export default MyTopics;