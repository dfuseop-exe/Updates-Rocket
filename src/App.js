import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export class App extends Component {


  togglemode = () => {
    console.log("clicked")

     if (this.state.mode === "light") {
       this.setState({ mode : 'dark'});
       document.body.style.backgroundColor = "#121212";
     document.body.style.color = "white";
     } else {
       this.setState({ mode : 'light'});
       document.body.style.backgroundColor = "white";
       document.body.style.color = "black";
     }
  };

  constructor() {
    //run before render
    super();
    this.state = {
      mode : "light"
    };
  }
  
  render() {
    return (
      <div>
        <Router >
        <Navbar mode={this.state.mode} togglemode={this.togglemode}/>
          
          <Switch>
          <Route exact path="/"> <News key="general" pageSize={6} country="in"  mode={this.state.mode} category="general"/> </Route>
          <Route exact path="/business"> <News key="business" pageSize={6} country="in"  mode={this.state.mode} category="business"/> </Route>
          <Route exact path="/entertainment"> <News key="entertainment" pageSize={6} country="in"  mode={this.state.mode} category="entertainment"/> </Route>
          <Route exact path="/health"> <News key="health" pageSize={6} country="in"  mode={this.state.mode} category="health"/> </Route>
          <Route exact path="/science"> <News key="science" pageSize={6} country="in"  mode={this.state.mode} category="science"/> </Route>
          <Route exact path="/sports"> <News key="sports" pageSize={6} country="in"  mode={this.state.mode} category="sports"/> </Route>
          <Route exact path="/technology"> <News key="technology" pageSize={6} country="in"  mode={this.state.mode} category="technology"/> </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}

export default App