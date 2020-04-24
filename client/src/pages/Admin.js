import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import ListView from "../components/ListView";
import API from "../components/utils/API";

const Admin = (props) => {
  // const [topic, setTopic] = useState([]);
  // const [comment, setComment] = useState([]);
  // const [poi, setPoi] = useState([]);
  const [list, setList] = useState([]);
  const [view, setView] = useState([]);

  useEffect(() => {
    adminList()
    // eslint-disable-next-line
  }, [])

  function adminList() {
    API.getAdminList()
    .then(function(result) {
      console.log(result);
      setList(result.data);
      // setTopic(result.data.topic);
      // setComment(result.data.comment);
      // setPoi(result.data.poi);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  function deleteThis(event) {
    const title = event.target.getAttribute("data-title");
    const user = event.target.getAttribute("data-user");
    const selection = document.getElementById("selectionTab").value;
    const data = {
      title: title,
      user: user,
      database: selection
    }

    API.deleteAdmin(data)
    .then(function(result) {
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

  const selectMarkers = () => {
    const selection = document.getElementById("selectionTab").value;
    switch(selection) {
      case "topic":
        setView(list.topic);
        break;
      case "comment":
        setView(list.comment);
        break;
      case "poi":
        setView(list.poi);
        break;
      default:
        // const all = list.topic + list.comment + list.poi // concat the arrays
        // setView(all);
        return;
    }
  }

  return (
    <Wrapper>
      <div id="main">
        <div className="d-flex justify-content-center">
          <select id="selectionTab" onChange={selectMarkers}>
            <option value="all">All</option>
            <option value="topic">Forum Topics</option>
            <option value="comment">Comments</option>
            <option value="poi">Points of Interest</option>
          </select>
        </div>
      </div>
      <br></br>
      <br></br>
      {/*switch case*/}
      {view.map(element => {
        return <ListView key={element.id} info={element} onClick={deleteThis}/>
      })}
    </Wrapper>
  )
}
  
export default Admin;