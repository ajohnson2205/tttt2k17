import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom'



import {
  acceptAvailableStatuses,
  updateeventStartTimestamp,
  eventUserAggTimes,
  determineWeekday,
  updateEventDuration

 } from '../actions/actions.js'



class NavBar extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    console.log("COMPONENT DID MOUNT")
    this.props.acceptAvailableStatuses();
    this.props.eventUserAggTimes();
    this.props.determineWeekday();
    this.timer = setInterval(() => {
      this.props.updateeventStartTimestamp();
    }, 1000)
  }

  componentWillUnmount() {
    console.log("COMPONENT WILL UNMOUNT")
    clearInterval(this.timer)
  }

  resetEventDuration() {
    this.props.updateEventDuration();
  }


  render() {


    return(
      <div className="navbar-container">
        <p>THIS IS THE NAVBAR. Are you not entertained?</p>
        <p>{this.props.genericReducer.weekday} + {this.props.genericReducer.status}</p>
        <p>{this.props.genericReducer.eventDuration}</p>
        <p>{this.props.genericReducer.currentTimestamp.toString()}

        </p>
        <div>
          <button
            onClick={(e) => {this.resetEventDuration()}}>RESET TIMER</button>
          </div>

          <div className="navbar-links">
            <Link
              to="/"
                >Home</Link>
            <Link
              to="/totalstatus"
                >Total Status</Link>
            <Link
              to="/dropdown"
              // target="_blank"
                >Drop Down</Link>
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
  updateeventStartTimestamp,
  eventUserAggTimes,
  determineWeekday,
  updateEventDuration
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
