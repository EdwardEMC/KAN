import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import ListView from "../components/ListView";
import API from "../components/utils/API";

const Admin = () => {
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
      setView(result.data.topic);
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
      view.map(element => {
        if(element.createdAt !== title) {
          return placeList.push(element);
        } 
        return true;
      });
      setView(placeList);
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
        return;
    }
  }

  function logout() {
    // trigger updating online lat/lng values to null
    API.logOut()
    .then(function() {
      // using href instead of history as href will refresh the page and disconnect any sockets automatically
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
      window.location.href="/";
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  return (
    <Wrapper>
      <h2 style={{float: "left"}}>ADMIN ONLY</h2>
      <button className="btn btn-warning" style={{float: "right"}} onClick={logout}>Log Out</button>
      <div id="main">
        <div className="d-flex justify-content-center">
          <select id="selectionTab" onChange={selectMarkers}>
            <option value="topic">Forum Topics</option>
            <option value="comment">Comments</option>
            <option value="poi">Points of Interest</option>
          </select>
        </div>
      </div>
      <br></br>
      <br></br>
      {view.map(element => {
        return <ListView key={element.id} info={element} onClick={deleteThis}/>
      })}
    </Wrapper>
  )
}
  
export default Admin;