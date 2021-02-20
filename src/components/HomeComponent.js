import logo from "../netflix.png";
import Video from "./Video";
import React from "react";

const Home = () => {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
            <div className="table-videos">
                <Video />
            </div>
        </div>
    )
}
export default Home;