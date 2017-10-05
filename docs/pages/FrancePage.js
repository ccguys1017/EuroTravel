import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Fa } from "mdbreact";

const ButtonPage = props => {
  return (
    <div className="container-fluid text-center">
      <div className="">
        <ButtonGroup vertical>
          <Button fixed color="blue">
            FRANCE
          </Button>
          <Button active active href="https://www.facebook.com">
            Paris
          </Button>
          <Button href="/css/table">Marseille</Button>
          <Button>Lyon</Button>
          <Button>Toulouse</Button>
          <Button>Nice</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ButtonPage;
