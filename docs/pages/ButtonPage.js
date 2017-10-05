import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Fa } from "mdbreact";

const ButtonPage = props => {
  return (
    <div className="container-fluid text-center">
      <div className="">
        <ButtonGroup vertical>
          <Button fixed color="blue">
            EUROPE
          </Button>
          <Button active href="/france">
            France
          </Button>
          <Button active href="/germany">
            Germany
          </Button>
          <Button active href="/italy">
            Italy
          </Button>
          <Button active href="/unitedkingdom">
            United Kingdom
          </Button>
          <Button active href="/spain">
            Spain
          </Button>
        </ButtonGroup>
        <ButtonGroup vertical>
          <Button fixed color="blue">
            USA
          </Button>
          <Button active href="https://www.facebook.com">
            Hawaii
          </Button>
          <Button active>California</Button>
          <Button active>Florida</Button>
          <Button active>New York</Button>
          <Button active>Alaska</Button>
        </ButtonGroup>
        <ButtonGroup vertical>
          <Button fixed color="blue">
            SOUTH AMERICA
          </Button>
          <Button active href="https://www.facebook.com">
            Bolivia
          </Button>
          <Button active>Brazil</Button>
          <Button active>Argentina</Button>
          <Button active>Columbia</Button>
          <Button active>Venezuela</Button>
        </ButtonGroup>
        <ButtonGroup vertical>
          <Button fixed color="blue">
            CANADA
          </Button>
          <Button active href="https://www.facebook.com">
            Toronto
          </Button>
          <Button active>Alberta</Button>
          <Button active>Montreal</Button>
          <Button active>Ontario</Button>
          <Button active>Vancouver</Button>
        </ButtonGroup>
        <ButtonGroup vertical>
          <Button fixed color="blue">
            ASIA
          </Button>
          <Button active href="https://www.facebook.com">
            China
          </Button>
          <Button active>Hong Kong</Button>
          <Button active>Indonesia</Button>
          <Button active>Japan</Button>
          <Button active>Singapore</Button>
        </ButtonGroup>
        <ButtonGroup vertical>
          <Button fixed color="blue">
            Africa
          </Button>
          <Button active href="https://www.facebook.com">
            Algeria
          </Button>
          <Button active>Ethiopia</Button>
          <Button active>Kenya</Button>
          <Button active>Morroco</Button>
          <Button active>Tunisia</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ButtonPage;
