import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Profile from "./pages/Profile";
// import Forum from "./pages/Forum";
// import Mapcomp from "./pages/Mapcomp";
// import Chats from "./pages/Chats";
// import Search from "./pages/Search";
// import Settings from "./pages/Settings";
// import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer";
import "./style.css";

// Making so the navbar does not appear on the login/register page
const NavRoutes = () => {
  return (
    <div className="App Site">
      <Header />
      <div className="Site-content">
        <Route exact path="/profile" component={Profile} />
        {/* <Route exact path="/forums" component={Forum} />
        <Route exact path="/map" component={Mapcomp} />
        <Route exact path="/chats" component={Chats} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/settings" component={Settings} />
        <Route path="*" component={NoMatch} /> */}
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
      </Switch>
    </Router>
  );
}

export default App;