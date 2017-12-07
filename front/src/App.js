import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StatusOptions from './components/StatusOptions.js'
import Home from './components/Home.js'
import TotalStatus from './components/TotalStatus.js'

//adding redux and routing
import { Route, Link } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/statusoptions" component={StatusOptions} />
          <Route exact path="/totalstatus" component={TotalStatus} />
        </main>
      </div>
    );
  }
}

export default App;
