import React, { Component } from "react";
import { Col, Container, Row, Footer } from "mdbreact";
import { Button } from "mdbreact";
import { Fa } from "mdbreact";
import {
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselInner,
  CarouselItem
} from "mdbreact";

class CarouselPage extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      activeItem: 1,
      maxLength: 4
    };
  }

  next() {
    const nextItem = (this.state.activeItem = this.state.activeItem + 1);
    if (nextItem > this.state.maxLength) {
      this.setState({ activeItem: 1 });
    } else {
      this.setState({ activeItem: nextItem });
    }
  }

  prev() {
    const prevItem = (this.state.activeItem = this.state.activeItem - 1);
    if (prevItem < 1) {
      this.setState({ activeItem: this.state.maxLength });
    } else {
      this.setState({ activeItem: prevItem });
    }
  }

  goToIndex(item) {
    if (this.state.activeItem !== item) {
      this.setState({
        activeItem: item
      });
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div className="container-">
        <div className="row">
          <div className="col">
            <Carousel
              activeItem={this.state.activeItem}
              next={this.next}
              className="z-depth-1"
            >
              <CarouselInner>
                <CarouselItem itemId="1">
                  <div className="view hm-black-light">
                    <img
                      className="d-block w-100"
                      src="http://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img%20(3).jpg"
                      alt="First slide"
                    />
                    <div className="mask" />
                  </div>
                  <CarouselCaption>
                    <h3 className="h3-responsive">words here</h3>
                    <p>text here</p>
                  </CarouselCaption>
                </CarouselItem>
                <CarouselItem itemId="2">
                  <div className="view hm-black-slight">
                    <img
                      className="d-block w-100"
                      src="http://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img%20(2).jpg"
                      alt="First slide"
                    />
                    <div className="mask" />
                  </div>
                  <CarouselCaption>
                    <h3 className="h3-responsive">words here</h3>
                    <p>text here</p>
                  </CarouselCaption>
                </CarouselItem>
                <CarouselItem itemId="3">
                  <div className="view hm-black-slight">
                    <img
                      className="d-block w-100"
                      src="http://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img%20(1).jpg"
                      alt="First slide"
                    />
                    <div className="mask" />
                  </div>
                  <CarouselCaption>
                    <h3 className="h3-responsive">words here</h3>
                    <p>text here</p>
                  </CarouselCaption>
                </CarouselItem>
                <CarouselItem itemId="4">
                  <div className="view hm-black-slight">
                    <img
                      className="d-block w-100"
                      src="http://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img%20(1).jpg"
                      alt="Mattonit's item"
                    />
                    <div className="mask" />
                  </div>
                  <CarouselCaption>
                    <h3 className="h3-responsive">Sopot Beach</h3>
                    <p>Taken june 21th by @julius</p>
                  </CarouselCaption>
                </CarouselItem>
              </CarouselInner>
              <CarouselControl
                direction="prev"
                role="button"
                onClick={() => {
                  this.prev();
                }}
              />
              <CarouselControl
                direction="next"
                role="button"
                onClick={() => {
                  this.next();
                }}
              />
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
}
export default CarouselPage;
