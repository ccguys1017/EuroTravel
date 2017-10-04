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
          <Button active href="https://www.facebook.com">
            Paris
          </Button>
          <Button active href="/css/table">
            Marseille
          </Button>
          <Button active>Lyon</Button>
          <Button active>Toulouse</Button>
          <Button active>Nice</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ButtonPage;
