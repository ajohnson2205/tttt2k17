import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DropDown from './components/DropDown.js'
import Home from './components/Home.js'
import TotalStatus from './components/TotalStatus.js'

//adding redux and routing
import { Route, Link } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/totalstatus">Total Status</Link>
          <Link to="/dropdown">Drop Down</Link>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/dropdown" component={DropDown} />
          <Route exact path="/totalstatus" component={TotalStatus} />
        </main>
      </div>
    );
  }
}

export default App;
