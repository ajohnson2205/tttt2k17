import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'



import
  {
  acceptAvailableStatuses,
  updateEventStartTimestamp,
  eventUserAggTimes,
  eventUserAggTimesSameDay,
  eventUserAggTimesLastSevenDays,
  eventUserAggTimesLastTwentyEightDays,
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
    this.props.eventUserAggTimesSameDay();
    this.props.eventUserAggTimesLastSevenDays();
    this.props.eventUserAggTimesLastTwentyEightDays();
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
      .then(response => console.log(response))
      .catch((error) => {
      console.log(error);
      })
    console.log("Creating a snapshot from the NavBar")
  }


  render() {


    return(
      <div className="navbar-container">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/statusoptions">Status Options</Link>
          <Link to="/totalstatus">Total Status</Link>
        </div>
        <div className="navbar-stats">
          <div>
            <h3>Happy {determineWeekdayFromNumber(this.props.genericReducer.currentWeekday)}!</h3>
            <p>It is {this.props.genericReducer.formattedTime}</p>
          </div>
          <div>
            <h3>Current Status</h3>
            <p>{this.props.genericReducer.status}</p>
            <p>{secondsToHHMMSS(this.props.genericReducer.eventDuration)}</p>
          </div>

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
  eventUserAggTimesSameDay,
  eventUserAggTimesLastSevenDays,
  eventUserAggTimesLastTwentyEightDays,
  determineWeekday,
  updateEventDuration
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
