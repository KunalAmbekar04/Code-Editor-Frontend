import React, { Component } from "react";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <Router>
        <Route path="/Code-Editor" exact>
          <App />
        </Route>
  
        <Route path="/Code-Editor/:id" component={App}/>
      </Router>
    );
  }
}

export default Main;
