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
            <img className="img-fluid" src={iconPath + "thingstodo.png"} alt="thingstodo" />
            <h5 className="link">Things To Do</h5> 
          </Link> 
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/music" >
            <img className="img-fluid" src={iconPath + "music.png"} alt="music" />
            <h5 className="link">Music</h5>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/news" >
            <img className="img-fluid" src={iconPath + "news.png"} alt="news" />
            <h5 className="link">News</h5>
          </Link>
        </div>
      </div>
      <div className="row secondRow">
        <div className="col-md-4 text-center">
          <Link to="/forums/politics" >
            <img className="img-fluid" src={iconPath + "politics.png"} alt="politics" />
            <h5 className="link">Politics</h5>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/pictures" >
            <img className="img-fluid" src={iconPath + "pictures.png"} alt="pictures" />
            <h5 className="link">Pictures</h5>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/recipes" >
            <img className="img-fluid" src={iconPath + "food.png"} alt="recipes" />
            <h5 className="link">Recipes</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForumInsert;