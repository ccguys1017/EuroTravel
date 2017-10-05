import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "mdbreact";

class ModalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          EUROPE
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop="static">
          <ModalHeader toggle={this.toggle}>
            I'm some kind of something
          </ModalHeader>
          <ModalBody>
            you won a million dollars! tell Jesse to pay you!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalPage;
