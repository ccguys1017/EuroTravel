import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Fa } from "mdbreact";
import { Col, Container, Row, Footer } from "mdbreact";

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

        <Footer>
          <Row>
            <Col md="6">
              <h5 className="title" />
              <p />
            </Col>
            <Col md="6">
              <h5 className="title">Follow Us</h5>
              <ul>
                <li class="">
                  <a href="https://www.facebook.com/Guide-Trip-115665839101471/">
                    <p>
                      <Fa icon="facebook" />
                    </p>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/guidetripme/">
                    <p>
                      <Fa icon="twitter" />
                    </p>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/guidetripme/">
                    <p>
                      <Fa icon="instagram" />
                    </p>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <div className="footer-copyright">
            <Container>
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="https://www.guidetrip.com"> guidetrip.com </a>
            </Container>
          </div>
        </Footer>
      </div>
    </div>
  );
};

export default ButtonPage;
