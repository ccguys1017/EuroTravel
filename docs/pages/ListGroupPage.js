import React from "react";
import { ListGroup, ListGroupItem, Badge } from "mdbreact";

const PaginationPage = props => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col" style={{ maxWidth: "23rem" }}>
          <ListGroup>
            <ListGroupItem
              href="#"
              className="d-flex justify-content-between align-items-center"
            >
              MyTrips<Badge pill>O</Badge>
            </ListGroupItem>
            <ListGroupItem
              active
              href="#"
              className="d-flex justify-content-between align-items-center"
            >
              SomethingHere<Badge pill>O</Badge>
            </ListGroupItem>
            <ListGroupItem
              href="#"
              className="d-flex justify-content-between align-items-center"
            >
              OtherStuffHere<Badge pill>O</Badge>
            </ListGroupItem>
            <ListGroupItem
              active
              href="#"
              className="d-flex justify-content-between align-items-center"
            >
              AnotherSuffHere<Badge pill>O</Badge>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default PaginationPage;
