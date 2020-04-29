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
            <h5><span className="link">Things To Do</span></h5> 
          </Link> 
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/music" >
            <img className="img-fluid" src={iconPath + "music.png"} alt="music" />
            <h5><span className="link">Music</span></h5>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/news" >
            <img className="img-fluid" src={iconPath + "news.png"} alt="news" />
            <h5><span className="link">News</span></h5>
          </Link>
        </div>
      </div>
      <div className="row secondRow">
        <div className="col-md-4 text-center">
          <Link to="/forums/politics" >
            <img className="img-fluid" src={iconPath + "politics.png"} alt="politics" />
            <h5><span className="link">Politics</span></h5>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/pictures" >
            <img className="img-fluid" src={iconPath + "pictures.png"} alt="pictures" />
            <h5><span className="link">Pictures</span></h5>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link to="/forums/recipes" >
            <img className="img-fluid" src={iconPath + "food.png"} alt="recipes" />
            <h5><span className="link">Recipes</span></h5>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForumInsert;