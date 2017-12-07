import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'



import
  {
  acceptAvailableStatuses,
  updateEventStartTimestamp,
  eventUserAggTimes,
  determineWeekday,
  updateEventDuration
  }
  from '../actions/actions.js'

import
  {
  secondsToHHMMSS,
  determineWeekdayFromNumber
  }
  from '../miscFunctions.js'



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
      this.props.updateEventStartTimestamp();
      if (this.props.genericReducer.currentSeconds % 15 === 0) {
        this.createSnapshot()
      }
    }, 1000);

  }

  componentWillUnmount() {
    console.log("COMPONENT WILL UNMOUNT")
    clearInterval(this.timer)
  }


  createSnapshot = () => {
    let {currentTimestamp, status, userID} = this.props.genericReducer;
    axios
      .post('http://localhost:4000/api/snapshots', {currentTimestamp, status, userID})

      .catch((error) => {
      console.log(error);
      })
    console.log("Creating a snapshot from the NavBar")
  }


  render() {


    return(
      <div className="navbar-container">
        <p>THIS IS THE NAVBAR. Are you not entertained?</p>
        <p>{determineWeekdayFromNumber(this.props.genericReducer.currentWeekday)} + {this.props.genericReducer.status}</p>
        <p>{this.props.genericReducer.eventDuration}</p>
        <p>{this.props.genericReducer.currentTimestamp.toString()}

        </p>

          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/totalstatus">Total Status</Link>
            <Link to="/statusoptions">Status Options</Link>
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
  updateEventStartTimestamp,
  eventUserAggTimes,
  determineWeekday,
  updateEventDuration
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
