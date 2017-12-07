import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import NavBar from './NavBar.js'

import
  {
  updateEventStartTimestamp
  }
  from '../actions/actions.js'

import
  {
  secondsToHHMMSS,
  determineWeekdayFromNumber
  }
  from '../miscFunctions.js'


import StatusButton from './StatusButton.js'

class StatusOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class: "status-box",
      updateClass: "status-box-active",
      indexToUpdate: ""
    }
  }


  componentDidMount() {
  // (1) Get auth set on mount
    const userInfo = axios.get('http://localhost:4000/statusoptions', {withCredentials: true}).then( res => {
        console.log(res)
        return res.data
    })


  }



  //Create an event logging what status the user has been in and send to database. then change them to the new status
    createEvent = (eventStartTimestamp, status, eventDuration, currentTimestamp, userID) => {
      axios
        .post('http://localhost:4000/api/events', {eventStartTimestamp, status, eventDuration, currentTimestamp, userID})
        .catch((error) => {
          console.log(error);
        })
    }





  //Use the snapshots table to determine how long folks have been in different statuses
    trackUserTimes = () => {
      axios
      .get('http://localhost:4000/api/usertimes')
      .then((response) => {
        console.log(response)
        this.setState({userTimes: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
    }


  //Change the background color of the buttons
    updateBackgroundColor = (index) => {
      this.setState({indexToUpdate: index})
    }












  render() {



    var statusBoxes = this.props.genericReducer.statusesAvailableForChoosing.map((status, index) => {
      return (
        <div key={index}>
          <StatusButton
            status={status}
            index={index}
            eventStartTimestamp={this.props.genericReducer.eventStartTimestamp}
            eventDuration={this.state.eventDuration}
            currentTimestamp={this.props.genericReducer.currentTimestamp}
            userID={this.state.userID}
            indexToUpdate={this.state.indexToUpdate} updateBackgroundColor={this.updateBackgroundColor}
            createEvent={this.createEvent}
          />
        </div>
      )
    })


    var eventUserAggTimesRender = this.props.genericReducer.eventUserAggTimes.map(event => {
      if (event.event_status === this.props.genericReducer.status) {
      return(
        <div key={event.event_status}>{event.event_status} : {parseInt(event.status_duration) + parseInt( this.state.eventDuration)}</div>
      )}
      else {
        return(
          <div key={event.event_status}>
            <div>{event.event_status} : {event.status_duration}</div>
          </div>
        )
      }
    })





    return(
      <div>
        <NavBar />


{/* Basic information about what's going on now */}
        <div>
          <h4>eventStartTimestamp: {this.props.genericReducer.eventStartTimestamp.toString()}</h4>
          <h4>currentTimestamp: {this.props.genericReducer.currentTimestamp.toString()}</h4>
          <h3>eventStatus: {this.props.genericReducer.status}</h3>
          <h3>eventDuration: {this.props.genericReducer.eventDuration} </h3>
          <p>Happy {determineWeekdayFromNumber(this.props.genericReducer.currentWeekday)}!</p>
          <p>HH:MM:SS</p>
          <p>{secondsToHHMMSS(this.props.genericReducer.eventDuration)}</p>
        </div>


{/* Dynamic render of all of the statuses a user could choose */}
        <div className="status-box-container">
          {statusBoxes}
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
  updateEventStartTimestamp
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusOptions)
