import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Fa } from "mdbreact";

const ButtonPage = props => {
  return (
    <div className="container-fluid text-center">
      <div className="">
        <ButtonGroup vertical>
          <Button fixed color="blue">
            SPAIN
          </Button>
          <Button active href="https://www.facebook.com">
            Barcelona
          </Button>
          <Button active href="/css/table">
            Madrid
          </Button>
          <Button active>Valencia</Button>
          <Button active>Seville</Button>
          <Button active>Bilbao</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ButtonPage;
