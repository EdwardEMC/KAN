import React from "react";
import API from "../utils/API";
import formatTime from "../utils/timeFormat";
import "./style.css";

function ListView(props) {
  let type = window.location.href.split("/my");

  function editDescription(event) {
    const commentId = event.target.getAttribute("data-id");
    document.getElementById('editDescription'+commentId).className="show";
    document.getElementById('description'+commentId).className="hide";
  }

  function submitEdit(event) {
    const commentId = event.target.getAttribute("data-id");
    const created = event.target.getAttribute("data-created");
    const edited = document.getElementById('editbox'+commentId).value.trim()
    const title = document.getElementById('edittitle'+commentId).value.trim()

    if(edited !== "" && title !== "") {
      const data = {
        editT: title,
        editD: edited,
        type: type[1],
        time: created
      }
      editSubmit(data);
    }
    else {
      return document.getElementById('editbox'+commentId).value = "**Title or description cannot be blank**";
    }
    
    document.getElementById('editDescription'+commentId).className="hide";
    document.getElementById('description'+commentId).className="show";
  }

  function editSubmit(data) {
    API.editList(data)
    .then(function(result) {
      props.load();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  return (
    <div>
      <div className="card"> 
        <div className="card-header text-center colorHeader">
          <div className="row">
            <div className="col-md-6 d-inline">
              <strong>Category: </strong>{props.info.category}
            </div>
            <div className="col-md-6 d-inline">
              <strong>Title: </strong>{props.info.title}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div id={"description" + props.info.id} className="show">
            <strong>Description: </strong>
            <br></br>
            {props.info.description}
          </div>
          <div id={"editDescription" + props.info.id} className="hide">
            <label htmlFor={"edittitle" + props.info.id}>Title</label>
            <textarea id={"edittitle" + props.info.id} className="inputColor" style={{width:"100%"}} defaultValue={props.info.title}>
              {/*Area for edited title*/}
            </textarea>
            <label htmlFor={"editbox" + props.info.id}>Description</label>
            <textarea id={"editbox" + props.info.id} className="inputColor" style={{width:"100%"}} defaultValue={props.info.description}>
              {/*Area for edited description*/}
            </textarea>
            <button data-id={props.info.id} data-created={props.info.createdAt} onClick={submitEdit}>Submit</button>
          </div>
          <div className="card-text text-right">
            <span id="edit" className="pointer" 
              data-id={props.info.id} 
              data-name={props.info.title} 
              value={props.info.createdAt} 
              onClick={editDescription}
            >
              Edit
            </span>
            &emsp;
            &emsp; 
            <span className="pointer link" onClick={() => console.log("click")}>Link</span>
            &emsp;
            &emsp;
            <span className="pointer delete" data-user={props.info.UserId} data-title={props.info.createdAt} onClick={props.onClick}>Delete</span>
          </div>
        </div>
        <div className="card-footer card-text text-muted text-center colorFooter">
          {formatTime(props.info.createdAt)}
        </div>
      </div>
      <br></br>
    </div>
  )
}

export default ListView;