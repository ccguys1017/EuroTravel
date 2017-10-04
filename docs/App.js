import React, { Component } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  NavItem,
  NavLink,
  Input
} from "mdbreact";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="flyout">
        <Navbar color="indigo" dark expand="md">
          <NavbarBrand href="/">My Dashboard</NavbarBrand>
          <NavbarToggler />
          <div className="collapse navbar-collapse" id="reactNavbar">
            <NavbarNav className="ml-auto">
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/button">Destinations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/listgroup">Trip Build</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" />
              </NavItem>
              <NavItem>
                <NavLink href="#" />
              </NavItem>
              <NavItem>
                <NavLink href="#" />
              </NavItem>
            </NavbarNav>
          </div>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
