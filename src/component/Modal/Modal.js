import React, { Component } from "react";
import { Form, Button as BootstrapBtn } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import "./Modal.css";
const EDITOR_URL = "http://localhost:3001/Code-Editor/";
const SERVER_URL = "http://localhost:3000/embedded/";

class ReactModal extends Component {
  state = {
    fileName: "",
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.toggleModal}
        animation={false}
        size="lg"
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Save File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Choose A File Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="File Name"
                onChange={(e) => {
                  console.log(e.target.value);
                  this.setState({
                    fileName: e.target.value,
                  });
                }}
              />
            </Form.Group>

            {this.props.saved ? (
              <>
                <Form.Label>Your Sharable Link Is : </Form.Label>
                <Form.Control
                  type="text"
                  value={EDITOR_URL + this.props.link}
                  readOnly
                />
              </>
            ) : null}
            <hr />

           {this.props.saved ? (
              <>
                <Form.Label>Embedd Code in Your Site : </Form.Label>
                <Form.Control
                  type="text"
                  value={`<script src="${SERVER_URL}${this.props.link}"></script>`}
                  readOnly

                />
              </>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <BootstrapBtn variant="secondary" onClick={this.props.toggleModal}>
            Close
          </BootstrapBtn>
          <BootstrapBtn
            variant="success"
            onClick={() => this.props.saveCode(this.state.fileName)}
          >
            Save
          </BootstrapBtn>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ReactModal;
