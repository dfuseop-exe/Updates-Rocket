
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';



export default class App extends Component {


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
        <Navbar mode={this.state.mode} togglemode={this.togglemode}/>
        <News pageSize={6} country='in' mode={this.state.mode} category="science"/>
      </div>
    )
  }
}

