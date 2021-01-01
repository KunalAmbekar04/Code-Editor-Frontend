import React, { Component } from "react";
import "./navbar.css";
import Button from "../button/button";

class Navbar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <h1>Code Editor</h1>
        <Button
          class="ui labeled icon button saveBtn"
          clicked={this.props.checkCode}
          isRunning={this.props.isRunning}
        >
          <i class="save icon"></i>
          Save Code
        </Button>
      </div>
    );
  }
}

export default Navbar;
