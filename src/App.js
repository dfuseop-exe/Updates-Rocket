import './App.css';

import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

const App = () => {

  let pageSize = 9 
  let apikey = process.env.REACT_APP_NEWS_API;

  const [Mode, setMode] = useState('light')
  const [Progress, setProgress] = useState(0);

  const togglemode = () => {
  
     if (Mode === "light") {
       setMode('dark');
       document.body.style.backgroundColor = "#121212";
       document.body.style.color = "white";
     } else {
       setMode('light');
       document.body.style.backgroundColor = "white";
       document.body.style.color = "black";
     }
  };
   return (
      <div>
        <Router >
        <Navbar mode={Mode} togglemode={togglemode}/>
         <LoadingBar
         height = {4}
        color='#f11946'
         progress = {Progress}
        />
        
          <Switch>
          <Route exact path="/"> <News  setProgress={setProgress} apikey={apikey}  key="general" pageSize={pageSize} country="in"  mode={Mode} category="general"/> </Route>
          <Route exact path="/business"> <News  setProgress={setProgress} apikey={apikey}  key="business" pageSize={pageSize} country="in"  mode={Mode} category="business"/> </Route>
          <Route exact path="/entertainment"> <News  setProgress={setProgress} apikey={apikey}  key="entertainment" pageSize={pageSize} country="in"  mode={Mode} category="entertainment"/> </Route>
          <Route exact path="/health"> <News  setProgress={setProgress} apikey={apikey}  key="health" pageSize={pageSize} country="in"  mode={Mode} category="health"/> </Route>
          <Route exact path="/science"> <News  setProgress={setProgress} apikey={apikey}  key="science" pageSize={pageSize} country="in"  mode={Mode} category="science"/> </Route>
          <Route exact path="/sports"> <News  setProgress={setProgress} apikey={apikey}  key="sports" pageSize={pageSize} country="in"  mode={Mode} category="sports"/> </Route>
          <Route exact path="/technology"> <News  setProgress={setProgress} apikey={apikey}  key="technology" pageSize={pageSize} country="in"  mode={Mode} category="technology"/> </Route>
        </Switch>
        </Router>
      </div>
    )
  
}

export default App