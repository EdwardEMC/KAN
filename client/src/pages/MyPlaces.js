import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../components/utils/API";
import Wrapper from "../components/Wrapper";
import ListView from "../components/ListView";

const MyPlaces = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    loadList()
  }, [])

  function loadList() {
    API.getPlaces()
    .then(function(result) {
      setList(result.data);
    }) // If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  function deletePlace(event) {
    const title = event.target.getAttribute("data-title");
    // console.log(title);
    API.deletePlace(title)
    .then(function(result) {
      console.log(result);
      const placeList = [];
      list.map(element => {
        if(element.title !== title) {
          return placeList.push(element);
        }
        return true;
      });
      setList(placeList);
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
      <h2 className="text-center">Places of Interest</h2>
        <br></br>
        {list.map(element => {
          return <ListView key={element.id} info={element} onClick={deletePlace}/>  
        })}
      </div>
    </Wrapper>
  )
}
  
export default MyPlaces;