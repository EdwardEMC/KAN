import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const iconPath = process.env.PUBLIC_URL + '/assets/ForumIcons/';

function ForumInsert() {
  return (
    <div className="container forumPics">
      <div className="row">
        <div className="col-md-4 text-center">
          <Link to="/forums/thingstodo" >
            <img src={iconPath + "thingstodo.png"} alt="thingstodo" />
            <p className="link">Things To Do</p> 
          </Link> 
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/music" >
            <img src={iconPath + "music.png"} alt="music" />
            <p className="link">Music</p>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/pictures" >
            <img src={iconPath + "pictures.png"} alt="pictures" />
            <p className="link">Pictures</p>
          </Link>
        </div>
      </div>
      <div className="row secondRow">
        <div className="col-md-4 text-center">
          <Link to="/forums/politics" >
            <img src={iconPath + "politics.png"} alt="politics" />
            <p className="link">Politics</p>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/news" >
            <img src={iconPath + "news.png"} alt="news" />
            <p className="link">News</p>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/recipes" >
            <img src={iconPath + "food.png"} alt="recipes" />
            <p className="link">Recipes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForumInsert;