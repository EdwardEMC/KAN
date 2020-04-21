import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Description from "./pages/Description";

//Profile pages
import Profile from "./pages/Profile";
import MyPlaces from "./pages/MyPlaces";
import MyTopics from "./pages/MyTopics";
import Settings from "./pages/Settings";

//Forum pages
import Forum from "./pages/Forum/Forum";
import Subforum from "./pages/Forum/Subforum";
import Topic from "./pages/Forum/Topic";
import PostTopic from "./pages/Forum/PostTopic"

//Other user pages
import OtherUsers from "./pages/OtherUsers";
import MapComp from "./pages/Mapcomp";
import Chats from "./pages/Chats";
import Search from "./pages/Search";

// import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer";
import "./style.css";

// import API from "./components/utils/API";

// function authenticate() {
//   let auth;
//   API.verify()
//   .then(function(result) {
//     console.log(result.data, "USER");
//     auth = result.data;
//   })
//   .catch(function(err) {
//     console.log(err);
//   })
//   return auth;
// }

// Making so the navbar does not appear on the login/register page
const NavRoutes = () => {

  // wrap everything in authentication and redirect to login if not logged in
  return (
    <div className="App Site">
      <Header />
      <div className="Site-content">
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/:user" component={OtherUsers} />
        <Route exact path="/forums" component={Forum} />
        <Route exact path="/forums/:handle" component={Subforum} />
        <Route exact path="/forums/:handle/:topic" component={Topic} />
        <Route exact path="/forums/:handle/post/topic" component={PostTopic} />
        <Route exact path="/myPlaces" component={MyPlaces} />
        <Route exact path="/myTopics" component={MyTopics} />
        <Route exact path="/mapType/:map" component={MapComp} />
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
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route component={NavRoutes} />
          {/* <AuthenticatedRoute component={NavRoutes} /> */}
        </Switch>
    </Router>
  );
}

// const AuthenticatedRoute = ({ component: Component, ...rest }) => {
//     let auth = authenticate();
//     <Route {...rest} render={props => (
//       auth ? ( // if user is authenticated
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/',
//       }}/>
//     )
//   )}/>
// };

export default App;