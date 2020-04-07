import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "./components/utils/GlobalState";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Description from "./pages/Description";

//Profile pages
import Profile from "./pages/Profile";
import MyPlaces from "./pages/MyPlaces";
import MyTopics from "./pages/MyTopics";

//Forum pages
import Forum from "./pages/Forum/Forum";
import Subforum from "./pages/Forum/Subforum";
import Topic from "./pages/Forum/Topic";
import PostTopic from "./pages/Forum/PostTopic"

import Mapcomp from "./pages/Mapcomp";
import Chats from "./pages/Chats";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
// import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer";
import "./style.css";

// Making so the navbar does not appear on the login/register page
const NavRoutes = () => {

  // wrap everything in authentication and redirect to login if not logged in
  return (
    <div className="App Site">
      <Header />
      <div className="Site-content">
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/forums" component={Forum} />
        <Route exact path="/forums/:handle" component={Subforum} />
        <Route exact path="/forums/:handle/:topic" component={Topic} />
        <Route exact path="/forums/:handle/post/topic" component={PostTopic} />
        <Route exact path="/myPlaces" component={MyPlaces} />
        <Route exact path="/myTopics" component={MyTopics} />
        <Route exact path="/map" component={Mapcomp} />
        <Route exact path="/chats" component={Chats} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/description" component={Description} />
        {/* <Route path="*" component={NoMatch} /> */}
      </div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <StoreProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route component={NavRoutes} />
        </Switch>
      </StoreProvider>
    </Router>
  );
}

export default App;