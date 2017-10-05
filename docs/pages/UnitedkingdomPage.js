import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Fa } from "mdbreact";

const ButtonPage = props => {
  return (
    <div className="container-fluid text-center">
      <div className="">
        <ButtonGroup vertical>
          <Button fixed color="blue">
            UNITED KINGDOM
          </Button>
          <Button active href="https://www.facebook.com">
            London
          </Button>
          <Button active href="/css/table">
            Birmingham
          </Button>
          <Button active>Glasgow</Button>
          <Button active>Edinburgh</Button>
          <Button active>Bristom</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ButtonPage;
