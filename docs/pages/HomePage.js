import React from "react";
const NavLink = require("react-router-dom").NavLink;

class HomePage extends React.Component {
  render() {
    return (
      <div className="carousel">
        <h1>Julius You got this</h1>
        <p>if you see this, bootstrap on react is now working</p>
        <NavLink to="/javascript/carousel" className="btn btn-primary btn-lg">
          Dive into React
        </NavLink>
      </div>
    );
  }
}

export default HomePage;
