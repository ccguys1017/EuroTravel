import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Fa } from "mdbreact";

const ButtonPage = props => {
  return (
    <div className="container-fluid text-center">
      <div className="">
        <ButtonGroup vertical>
          <Button disabled color="blue">
            GERMANY
          </Button>
          <Button active href="https://www.facebook.com">
            Hamburg
          </Button>
          <Button active href="/css/table">
            Bevaria
          </Button>
          <Button active />
          <Button active>North Rhine-Westphalia</Button>
          <Button active>Berlin</Button>
          <Button active>Munich</Button>
          <Button active>Dusseldorf</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ButtonPage;
