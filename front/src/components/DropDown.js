import React, { Component } from 'react';
// import '../paper.css';
import statuses from '../tempData/statuses.js'
import axios from 'axios';


class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theTimestamp: new Date(),
      status: null,
      currentTimestamp: new Date(),
      currentWeekday: '',
      currentFullYear: '',
      currentMonth: '',
      currentDate: '',
      currentHours: '',
      currentMinutes: '',
      currentSeconds: '',
      timeInCurrentStatus: '',
      eventDuration: 0,
      snapshotStatus: null,
      snapshotTimestamp: null,
      userID: 12,
      userTimes: [],
      eventUserAggTimes: []
    }
  }



  componentDidMount() {
    this.eventUserAggTimes();
    setInterval(() => {
      this.setState({
        currentTimestamp: new Date(),
        currentWeekday: new Date().getDay(),
        currentFullYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        currentDate: new Date().getDate(),
        currentHours: new Date().getHours(),
        currentMinutes: new Date().getMinutes(),
        currentSeconds: new Date().getSeconds(),
        eventDuration: this.state.eventDuration + 1
      });

  //LOGIC FOR SNAPSHOTS
      if (this.state.currentSeconds % 10 === 0) {
        this.setState({snapshotStatus: this.state.status, snapshotTimestamp: this.state.currentTimestamp});
        this.createSnapshot();
        this.trackUserTimes();
      };
    }, 1000)
  }



    createSnapshot = () => {
      let {snapshotTimestamp, snapshotStatus, userID} = this.state;
      axios
        .post('http://localhost:4000/api/snapshots', {snapshotTimestamp, snapshotStatus, userID})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
        console.log(error);
        })
    }


    createEvent = (theTimestamp, status, eventDuration, currentTimestamp, userID) => {
      axios
        .post('http://localhost:4000/api/events', {theTimestamp, status, eventDuration, currentTimestamp, userID})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
        console.log(error);
        })
    }


    searchStatuses = (searchInput) => {
      console.log(searchInput)
      axios
        .get('http://localhost:4000/api/statuses?=' + this.state.statusSearchValue

        )
        .then((response) => {
          console.log("THIS IS WHAT I'M GETTING BACK", response);
        })
        .catch((error) => {
        console.log(error);
        })
    }


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


    eventUserAggTimes = () => {
      axios
      .get('http://localhost:4000/api/eventUserAggTimes')
      .then((response) => {
        console.log(response)
        this.setState({eventUserAggTimes: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
    }



  render() {
    var statusOptions = statuses.map(status => {
      return (
        <option>{status.name}</option>
      )
    })

    var statusBoxes = statuses.map(status => {
      return (
        <div
          className="status-box"
          onClick={(e) => {
            if (status.name !== this.state.status) {
              this.createEvent(
                this.state.theTimestamp,
                this.state.status,
                this.state.eventDuration,
                this.state.currentTimestamp,
                this.state.userID);
              this.eventUserAggTimes();
              this.setState({
                status: status.name,
                theTimestamp: this.state.currentTimestamp,
                eventDuration:0
              })
            }}}
          >{status.name}</div>
      )
    })


    var userTimes = this.state.userTimes.map(response => {
      return(
        <div>{response.snapshot_status} : {response.status_duration}</div>
      )})



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

    var hours = Math.floor((this.state.eventDuration)/3600)
    if(hours < 10) {
      var displayHours = "0" + hours.toString()
    }
    else displayHours = hours

    var minutes = Math.floor((this.state.eventDuration)/60 - (hours * 60)).toString()
    if(minutes < 10) {
      var displayMinutes = "0" + minutes.toString()
    }
    else displayMinutes = minutes

    var seconds = this.state.eventDuration - (hours * 3600) - (minutes * 60).toString()
    if(seconds < 10) {
      var displaySeconds = "0" + seconds.toString()
    }
    else displaySeconds = seconds




    return(
      <div>


{/* Search option for choosing statuses */}
        <div>
          <input
            className="status-search-input"
            placeholder="What are you up to today?"
            onChange={(e) => {this.setState({statusSearchValue: e.target.value});
            this.searchStatuses(this.state.statusSearchValue) }}
            ></input>
        </div>


{/* Drop down menu for choosing statuses */}
        {/* <div>
          <select onChange={(e) => {
            this.setState(
            {
              status: e.target.value,
              theTimestamp: new Date(),
              eventDuration:0
            })
          this.createEvent(new Date(), e.target.value, this.state.userID)}}>
            {statusOptions}
          </select>
        </div> */}


{/* Basic information about what's going on now */}
        <div>
          <h1>{this.state.status}</h1>
          <h4>theTimestamp: {this.state.theTimestamp.toString()}</h4>
          <h4>currentTimestamp: {this.state.currentTimestamp.toString()}</h4>
          <h3>eventStatus: {this.state.status}</h3>
          <h3>eventDuration: {this.state.eventDuration} </h3>
          <p>Happy {determineWeekday(this.state.currentWeekday)}!</p>
          <p>    H     M     S    </p>
          <p>{displayHours}:{displayMinutes}:{displaySeconds}</p>
        </div>


{/* Dynamic render of all of the statuses a user could choose */}
        <div className="status-box-container">
          {statusBoxes}
        </div>


{/* Dynamic render of how long a user has spent in each status */}
        <div>
          {userTimes}
        </div>



      </div>
    )
  }
}

export default DropDown
