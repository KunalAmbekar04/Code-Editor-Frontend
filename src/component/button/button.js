import React, { Component } from "react";
import "./button.css";

class Button extends Component {
  render() {
    let classes = "bttn " + this.props.class;

    return (
      <button
        className={classes}
        onClick={this.props.clicked}
        disabled={this.props.isRunning}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
