import React from "react";
import Logo from "./Logo.js";
import "./App.css";

/////////////////
/// COMPONENTS //
/////////////////

// Container
var App = React.createClass({
  apiKey: "",
  getInitialState: function() {
    return { searchTerm: "", searchUrl: "" };
  },
  handleKeyUp: function(e) {
    if (e.key === "Enter" && this.state.searchTerm !== "") {
      var searchUrl =
        "search/multi?query=" +
        this.state.searchTerm +
        "&api_key=" +
        this.apiKey;
      this.setState({ searchUrl: searchUrl });
    }
  },

  handleChange: function(e) {
    this.setState({ searchTerm: e.target.value });
  },
  render: function() {
    return (
      <div>
        <header className="Header">
          <Logo />
          <Navigation />
          <div id="search" className="Search">
            <input
              onKeyUp={this.handleKeyUp}
              onChange={this.handleChange}
              type="search"
              placeholder="Search..."
              value={this.state.searchTerm}
            />
          </div>
          <UserProfile />
        </header>
        <Hero />
        <TitleList title="Search Results" url={this.state.searchUrl} />
        <TitleList title="Top Destinations" url="" />
        <TitleList title="" url="" />
        <TitleList />
        <TitleList />
        <TitleList title="" url="" />
      </div>
    );
  }
});

// Navigation
var Navigation = React.createClass({
  render: function() {
    return (
      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li>GUIDE TRIP</li>
            <li>Destinations</li>
            <li>My list</li>
          </ul>
        </nav>
      </div>
    );
  }
});

// User Profile
var UserProfile = React.createClass({
  render: function() {
    return (
      <div className="UserProfile">
        <div className="User" />
      </div>
    );
  }
});

//////////
// Hero //
//////////

var Hero = React.createClass({
  render: function() {
    return (
      <div
        id="hero"
        className="Hero"
        style={{
          backgroundImage:
            "url(https://images4.alphacoders.com/607/thumb-1920-607341.jpg"
        }}
      >
        <div className="content">
          <img className="logo" src="" alt="Start your vacation" />
          <h2>Today</h2>
          <p>Sign up and create your vacation to do list.</p>
          <div className="button-wrapper">
            <HeroButton primary={true} text="Sign Up" />
            <HeroButton primary={false} text="+ Log In" />
          </div>
        </div>
        <div className="overlay" />
      </div>
    );
  }
});

// Hero Button
var HeroButton = React.createClass({
  render: function() {
    return (
      <a href="#" className="Button" data-primary={this.props.primary}>
        {this.props.text}
      </a>
    );
  }
});
var TitleList = React.createClass({
  apiKey: "",
  getInitialState: function() {
    return { data: [], mounted: false };
  },
  loadContent: function() {
    var requestUrl = "" + this.props.url + "&api_key=" + this.apiKey;
    fetch(requestUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data: data });
      })
      .catch(err => {
        console.log("There has been an error");
      });
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.url !== this.props.url && nextProps.url !== "") {
      this.setState({ mounted: true, url: nextProps.url }, () => {
        this.loadContent();
      });
    }
  },
  componentDidMount: function() {
    if (this.props.url !== "") {
      this.loadContent();
      this.setState({ mounted: true });
    }
  },
  render: function() {
    var titles = "";
    if (this.state.data.results) {
      titles = this.state.data.results.map(function(title, i) {
        if (i < 5) {
          var name = "";
          var backDrop = "" + title.backdrop_path;
          if (!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return (
            <Item
              key={title.id}
              title={name}
              score={title.vote_average}
              overview={title.overview}
              backdrop={backDrop}
            />
          );
        } else {
          return <div key={title.id} />;
        }
      });
    }

    return (
      <div
        ref="titlecategory"
        className="TitleList"
        data-loaded={this.state.mounted}
      >
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-wrapper">{titles}</div>
        </div>
      </div>
    );
  }
});

// Title List Item
var Item = React.createClass({
  render: function() {
    return (
      <div
        className="Item"
        style={{ backgroundImage: "url(" + this.props.backdrop + ")" }}
      >
        <div className="overlay">
          <div className="">{this.props.title}</div>
          <div className="">{this.props.score} / 10</div>
          <div className="">{this.props.overview}</div>
          <ListToggle />
        </div>
      </div>
    );
  }
});

// ListToggle
var ListToggle = React.createClass({
  getInitialState: function() {
    return { toggled: false };
  },
  handleClick: function() {
    if (this.state.toggled === true) {
      this.setState({ toggled: false });
    } else {
      this.setState({ toggled: true });
    }
  },
  render: function() {
    return (
      <div
        onClick={this.handleClick}
        data-toggled={this.state.toggled}
        className="ListToggle"
      >
        <div>
          <i className="fa fa-fw fa-plus" />
          <i className="fa fa-fw fa-check" />
        </div>
      </div>
    );
  }
});

export default App;
