//import React from "react";
import React, { Component } from "react";
import { Button, ButtonGroup, ButtonToolbar, Fa } from "mdbreact";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//import axios from "axios";
//import Tripbuild from './tripbuild';

let trip_city,
  trip_country = "France";

class FrancePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itins_retrieved: false
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  handleParisClick() {
    trip_city = "Paris";
    localStorage.setItem("sel_city", trip_city);
    localStorage.setItem("sel_country", trip_country);

    console.log("trip city: " + trip_city);
    console.log("trip country: " + trip_country);
    //this.context.router.history.push("/button");
    //this.props.history.push("/button");
    this.context.router.history.push("/button");

    //Go to /tripbuild
  }

  handleMarseilleClick() {}

  handleLyonClick() {}

  handleToulouseClick() {}

  handleNiceClick() {}

  render() {
    //const ButtonPage = props => {
    return (
      <div className="container-fluid text-center">
        <div className="">
          <ButtonGroup vertical>
            <Button fixed color="blue">
              FRANCE
            </Button>
            <Button active onClick={this.handleParisClick}>
              Paris
            </Button>
            <Button active onClick={this.handleMarseilleClick}>
              Marseille
            </Button>
            <Button active onClick={this.handleLyonClick}>
              Lyon
            </Button>
            <Button active onClick={this.handleToulouseClick}>
              Toulouse
            </Button>
            <Button active onClick={this.handleNiceClick}>
              Nice
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default FrancePage;
