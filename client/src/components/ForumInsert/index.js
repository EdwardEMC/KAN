import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function ForumInsert() {
  return (
    <div className="container forumPics">
      <div className="row">
        <div className="col-sm-4 text-center">
          <Link to="/forums/recipes" >
            <img src="" alt="recipes" />
            <p>Recipes</p>
          </Link>
        </div>
        <div className="col-sm-4 text-center">
          <Link to="/forums/thingstodo" >
            <img src="" alt="thingstodo" />
            <p>Things To Do</p> 
          </Link> 
        </div>
        <div className="col-sm-4 text-center">
          <Link to="/forums/pictures" >
            <img src="" alt="pictures" />
            <p>Pictures</p>
          </Link>
        </div>
      </div>
      <div className="row secondRow">
        <div className="col-sm-4 text-center">
          <Link to="/forums/politics" >
            <img src="" alt="politics" />
            <p>Politics</p>
          </Link>
        </div>
        <div className="col-sm-4 text-center">
          <Link to="/forums/news" >
            <img src="" alt="news" />
            <p>News</p>
          </Link>
        </div>
        <div className="col-sm-4 text-center">
          <Link to="/forums/music" >
            <img src="" alt="music" />
            <p>Music</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForumInsert;