import React from "react";
import { Input, FormInline, Button } from "mdbreact";

class InputPage extends React.Component {
  render() {
    return (
      <div className="container-fluid" style={{ textAlign: "initial" }}>
        <div>
          <FormInline>
            <Input
              label="email"
              icon="envelope"
              group
              type="email"
              validate
              error="wrong"
              success="right"
            />
            <Input
              label="password"
              icon="lock"
              group
              type="password"
              validate
            />
            <Button>Login</Button>
          </FormInline>
          <FormInline>
            <Input
              label="Type your email"
              icon="envelope"
              group
              type="email"
              validate
              error="wrong"
              success="right"
            />
            <Button>SignUp</Button>
          </FormInline>
        </div>
      </div>
    );
  }
}

export default InputPage;
