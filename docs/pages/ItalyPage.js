import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Fa } from "mdbreact";

const ButtonPage = props => {
  return (
    <div className="container-fluid text-center">
      <div className="">
        <ButtonGroup vertical>
          <Button fixed color="blue">
            ITALY
          </Button>
          <Button active href="https://www.facebook.com">
            Rome
          </Button>
          <Button active href="/css/table">
            Milan
          </Button>
          <Button active>Naples</Button>
          <Button active>turin</Button>
          <Button active>Florence</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ButtonPage;
