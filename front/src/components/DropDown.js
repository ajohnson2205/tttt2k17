import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import NavBar from './NavBar.js'

import {
  updateeventStartTimestamp

 } from '../actions/actions.js'


import StatusButton from './StatusButton.js'

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventStartTimestamp: new Date(),
      status: null,
      currentTimestamp: new Date(),
      currentWeekday: '',
      currentSeconds: '',
      timeInCurrentStatus: '',
      eventDuration: 0,
      snapshotStatus: null,
      snapshotTimestamp: null,
      userID: 12,
      userTimes: [],
      eventUserAggTimes: [],
      searchResultArray: [],
      class: "status-box",
      updateClass: "status-box-active",
      indexToUpdate: ""
    }
  }


  componentDidMount() {
  // (1) Get auth set on mount
    const userInfo = axios.get('http://localhost:4000/dropdown', {withCredentials: true}).then( res => {
        console.log(res)
        return res.data
    })



  // (4) Tick on mount
    setInterval(() => {
      this.setState({
        currentTimestamp: new Date(),
        currentWeekday: new Date().getDay(),
        currentSeconds: new Date().getSeconds(),
        eventDuration: this.state.eventDuration + 1
      },
    );

  // LOGIC FOR SNAPSHOTS
      if (this.state.currentSeconds % 10 === 0) {
        this.setState({snapshotStatus: this.props.genericReducer.status, snapshotTimestamp: this.props.genericReducer.currentTimestamp});
        this.createSnapshot();
        console.log("Creating snapshot")
      };
    }, 1000)
  }


  //Create a snapshot of the user's current status and send to the database
    createSnapshot = () => {
      let {snapshotTimestamp, snapshotStatus, userID} = this.state;
      axios
        .post('http://localhost:4000/api/snapshots', {snapshotTimestamp, snapshotStatus, userID})

        .catch((error) => {
        console.log(error);
        })
    }


  //Create an event logging what status the user has been in and send to database. then change them to the new status
    createEvent = (eventStartTimestamp, status, eventDuration, currentTimestamp, userID) => {
      axios
        .post('http://localhost:4000/api/events', {eventStartTimestamp, status, eventDuration, currentTimestamp, userID})
        .then((res) => {
          this.setState({
            status: status.status_name,
            eventStartTimestamp: this.props.genericReducer.currentTimestamp,
            eventDuration:0,
          })
        })
        .catch((error) => {
          console.log(error);
        })
    }


  //Search the database for available statuses
    searchStatuses = (searchInput) => {
      console.log(searchInput)
      axios
        .get('http://localhost:4000/api/statuses?searchValue=' + this.props.genericReducer.statusSearchValue
        )
        .then((response) => {
          this.setState({searchResultArray: response.data})
        })
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

    function determineWeekday(param) {
      var day
      switch(param) {
        case 0 : day = 'Sunday'
          break;
        case 1 : day = 'Monday'
          break;
        case 2 : day = 'Tuesday'
          break;
        case 3 : day = 'Wednesday'
          break;
        case 4 : day = 'Thursday'
          break;
        case 5 : day = 'Friday'
          break;
        case 6 : day = 'Saturday'
          break;
        default: 'WTF?'
      }
      return day
    }

    function secondsToHHMMSS(seconds) {
      var hours = Math.floor((seconds)/3600)
      if(hours < 10) {
        var displayHours = "0" + hours.toString()
      }
      else displayHours = hours

      var minutes = Math.floor((seconds)/60 - (hours * 60)).toString()
      if(minutes < 10) {
        var displayMinutes = "0" + minutes.toString()
      }
      else displayMinutes = minutes

      var seconds = seconds - (hours * 3600) - (minutes * 60).toString()
      if(seconds < 10) {
        var displaySeconds = "0" + seconds.toString()
      }
      else displaySeconds = seconds

      return( displayHours + ":" + displayMinutes + ":" + displaySeconds)
    }


    return(
      <div>
        <NavBar />

{/* Search option for choosing statuses */}
        {/* <div>
          <input
            className="status-search-input"
            placeholder="What are you up to today?"
            onChange={(e) => {this.setState({statusSearchValue: e.target.value}, () => {
              this.searchStatuses(this.props.genericReducer.statusSearchValue)
          });
             }}
            ></input>


        </div> */}



{/* Basic information about what's going on now */}
        <div>
          <h4>eventStartTimestamp: {this.props.genericReducer.eventStartTimestamp.toString()}</h4>
          <h4>currentTimestamp: {this.props.genericReducer.currentTimestamp.toString()}</h4>
          <h3>eventStatus: {this.props.genericReducer.status}</h3>
          <h3>eventDuration: {this.props.genericReducer.eventDuration} </h3>
          <p>Happy {determineWeekday(this.state.currentWeekday)}!</p>
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
  updateeventStartTimestamp
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
