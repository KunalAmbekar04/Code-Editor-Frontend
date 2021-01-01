import React, { Component } from "react";
import "./dropdown.css";

const languageToId = {
  0: "C",
  1: "C++",
  2: "Python",
};

class Dropdown extends Component {
  state = {
    options: [],
  };

  componentDidMount() {
    let op = [];
    for (const [key, value] of Object.entries(this.props.options)) {
      op.push({ key, value });
    }
    this.setState({
      options: op,
    });
  }

  render() {
    return (
      <select
        onChange={this.props.selected}
        id={this.props.id}
        className="select_box"
      >
        {this.state.options.map((val) => {
          if (
            this.props.sharable &&
            val.value === languageToId[this.props.languageId]
          ) {
            return (
              <option value={val.key} selected>
                {val.value}
              </option>
            );
          }
          return <option value={val.key}>{val.value}</option>;
        })}
      </select>
    );
  }
}

export default Dropdown;
