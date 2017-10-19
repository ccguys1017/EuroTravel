import React from 'react';
import ChatApp from './ChatApp';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';




class IMApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: localStorage.getItem('userEmail') };

    // Bind 'this' to event handlers. React ES6 does not do this by default
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }

  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: localStorage.getItem('userEmail') });
  }

  render() {

      // Form was submitted, now show the main App
      return (
        <div>
          <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/"><strong>GuideTrip</strong></a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={2} href="/"><strong>Home</strong></NavItem>
      <NavItem eventKey={1} href="/dashboard"><strong>Dashboard</strong></NavItem>
      <NavItem eventKey={1} href="/hotelBuild"><strong>Hotels</strong></NavItem>
    </Nav>
  </Navbar>
        <ChatApp username={localStorage.getItem('userEmail')} />
        
        </div>
      );
    

    // Initial page load, show a simple login form

  }

}
IMApp.defaultProps = {
};

export default IMApp;
