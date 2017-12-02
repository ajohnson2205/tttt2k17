import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom'



import {
  acceptAvailableStatuses,
  updateTheTimestamp,
  eventUserAggTimes,
  determineWeekday

 } from '../actions/actions.js'


var day

class NavBar extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.props.acceptAvailableStatuses();
    this.props.eventUserAggTimes();
    this.props.determineWeekday();
    setInterval(() => {
      this.props.updateTheTimestamp();
    }, 1000)
  }




  render() {
    return(
      <div className="navbar-container">
        <p>THIS IS THE NAVBAR. Are you not entertained?</p>
        <p>{this.props.genericReducer.weekday}</p>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/totalstatus">Total Status</Link>
            <Link to="/dropdown">Drop Down</Link>
          </div>
      </div>
  )
  }
}


const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = {
  acceptAvailableStatuses,
  updateTheTimestamp,
  eventUserAggTimes,
  determineWeekday
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
