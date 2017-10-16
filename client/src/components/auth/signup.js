import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import PropTypes from "prop-types";
import { Table, Nav, Navbar, NavItem } from "react-bootstrap";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (this.props.authenticated) {
      localStorage.setItem("userEmail", this.props.values.email);
      this.context.router.history.push("/");
    }
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
    localStorage.setItem("userEmail", this.props.values.email);
    this.context.router.history.push("/");
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const footerStyle = {
      backgroundColor: "#261e72",
      fontSize: "15px",
      color: "white",
      borderTop: "1px solid #7fa5f7",
      textAlign: "center",
      padding: "0px",
      position: "fixed",
      left: "0",
      bottom: "0",
      height: "40px",
      width: "100%"
    };

    const phantomStyle = {
      display: "block",
      padding: "20px",
      height: "60px",
      width: "100%"
    };

    function Footer({ children }) {
      return (
        <div>
          <div style={phantomStyle} />
          <div style={footerStyle}>{children}</div>
        </div>
      );
    }

    const {
      handleSubmit,
      fields: { email, password, passwordConfirm }
    } = this.props;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">GuideTrip</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={2} href="/">
              Home
            </NavItem>
            <NavItem eventKey={1} href="/hotelBuild">
              Hotels
            </NavItem>
          </Nav>
        </Navbar>
        <div className="tg-login__wrapper">
          <div className="col-md-5" />
          <div className="col-md-6">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <fieldset className="form-group">
                <label>
                  <strong>Email:</strong>
                </label>
                <input
                  className="form-control"
                  {...email}
                  style={{ width: "40%" }}
                  placeholder="Enter email"
                />
                {email.touched &&
                  email.error && <div className="error">{email.error}</div>}
              </fieldset>
              <fieldset className="form-group">
                <label>
                  <strong>Password:</strong>
                </label>
                <input
                  className="form-control"
                  {...password}
                  style={{ width: "40%" }}
                  type="password"
                  placeholder="Enter password"
                />
                {password.touched &&
                  password.error && (
                    <div className="error">{password.error}</div>
                  )}
              </fieldset>
              <fieldset className="form-group">
                <label>
                  <strong>Confirm Password:</strong>
                </label>
                <input
                  className="form-control"
                  {...passwordConfirm}
                  style={{ width: "40%" }}
                  type="password"
                  placeholder="Enter password again"
                />
                {passwordConfirm.touched &&
                  passwordConfirm.error && (
                    <div className="error">{passwordConfirm.error}</div>
                  )}
              </fieldset>
              {this.renderAlert()}
              <button action="submit" className="btn btn-primary">
                Sign up!
              </button>
            </form>
            <Footer>
              <a href="/"> Home</a>
              <a href="/hotelBuild"> Hotels</a>

              <div className="footer-copyright">
                <div className="container-fluid">
                  © 2017 Copyright:{" "}
                  <a href="http://www.guidetrip.me"> www.Guidetrip.me </a>
                </div>
              </div>
            </Footer>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = "Please enter an email";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Passwords must match";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm(
  {
    form: "signup",
    fields: ["email", "password", "passwordConfirm"],
    validate
  },
  mapStateToProps,
  actions
)(Signup);
