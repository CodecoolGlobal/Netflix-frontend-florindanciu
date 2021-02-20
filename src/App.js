import React from "react";
import './App.css';
import { Switch, Route } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import VideoDetails from "./components/VideoDetails";

function App() {
  return (
      <Switch>
          <Route exact path={"/"} component={HomeComponent} />
          <Route exact path={"/video/:videoId"} component={VideoDetails} />
      </Switch>
  );
}

export default App;
