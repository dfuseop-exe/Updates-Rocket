import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

export class App extends Component {

  pageSize = 9 

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

  state = {
    progress : 0
  }

  setProgress = (progress)=>{
    this.setState({
      progress : progress
    })
  }
  
  render() {
    
    return (
      <div>
        <Router >
        <Navbar mode={this.state.mode} togglemode={this.togglemode}/>
         <LoadingBar
         height = {4}
        color='#f11946'
        progress={this.state.progress}
    
        />
        
          <Switch>
          <Route exact path="/"> <News  setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in"  mode={this.state.mode} category="general"/> </Route>
          <Route exact path="/business"> <News  setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in"  mode={this.state.mode} category="business"/> </Route>
          <Route exact path="/entertainment"> <News  setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in"  mode={this.state.mode} category="entertainment"/> </Route>
          <Route exact path="/health"> <News  setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in"  mode={this.state.mode} category="health"/> </Route>
          <Route exact path="/science"> <News  setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in"  mode={this.state.mode} category="science"/> </Route>
          <Route exact path="/sports"> <News  setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in"  mode={this.state.mode} category="sports"/> </Route>
          <Route exact path="/technology"> <News  setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in"  mode={this.state.mode} category="technology"/> </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}

export default App