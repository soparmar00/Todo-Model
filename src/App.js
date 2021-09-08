import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Todo from "./Component/Todo";


function App() {
  return (
    <div className="App">
     <Router>
      <Switch>
      <Route path="/" exact component={Todo} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
