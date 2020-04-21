import React, { useState, useEffect } from "react";
import API from "../components/utils/API";
import Wrapper from "../components/Wrapper";
import ListView from "../components/ListView";

const MyTopics = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    loadTopics()
  }, [])

  function loadTopics() {
    API.getTopics()
    .then(function(result) {
      setList(result.data);
    }) // If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  return (
    <Wrapper>
      <div className="container">
        <h2 className="text-center">Topics</h2>
        <br></br>
        {list.map(element => {
          return <ListView key={element.id} info={element}/>  
        })}
      </div>
    </Wrapper>
  )
}
  
export default MyTopics;