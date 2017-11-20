import React, { Component } from 'react';
// import '../paper.css';
import statuses from '../tempData/statuses.js'
import axios from 'axios';


class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'none',
      theTimestamp: new Date(),
      currentTimestamp: new Date(),
      currentWeekday: '',
      timeInCurrentStatus: '',
      counter: 0,
      snapshotStatus: null,
      snapshotTimestamp: null,
      userID: 12
    }
  }


componentDidMount() {
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
      counter: this.state.counter + 1
    });
    if (this.state.currentSeconds % 10 === 0) {
      this.setState({snapshotStatus: this.state.status, snapshotTimestamp: this.state.currentTimestamp});
      this.createSnapshot();
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


  createEvent = (theTimestamp, status, userID) => {
    axios
      .post('http://localhost:4000/api/events', {theTimestamp, status, userID})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
      console.log(error);
      })
  }


  searchStatuses = (searchInput) => {
    console.log(searchInput)
  }



  render() {
    var statusOptions = statuses.map(status => {
      return (
        <option>{status.name}</option>
      )
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

    var hours = Math.floor((this.state.counter)/3600)
    if(hours < 10) {
      var displayHours = "0" + hours.toString()
    }
    else displayHours = hours

    var minutes = Math.floor((this.state.counter)/60 - (hours * 60)).toString()
    if(minutes < 10) {
      var displayMinutes = "0" + minutes.toString()
    }
    else displayMinutes = minutes

    var seconds = this.state.counter - (hours * 3600) - (minutes * 60).toString()
    if(seconds < 10) {
      var displaySeconds = "0" + seconds.toString()
    }
    else displaySeconds = seconds


    return(




      <div>
        <div>
          <input
            placeholder="What are you up to today?"
            ref="statusSearch"
            onChange={(e) => {this.setState({statusSearchValue: e.target.value});
            this.searchStatuses(this.state.statusSearchValue) }}
            ></input>
        </div>

        <div>
          <select onChange={(e) => {
            this.setState(
            {
              status: e.target.value,
              theTimestamp: new Date(),
              counter:0
            })
          this.createEvent(new Date(), e.target.value, this.state.userID)}}>
            {statusOptions}
          </select>
        </div>
        <div>
          <h4>Current status: {this.state.status}</h4>
          <h4>Began at: {this.state.theTimestamp.toString()}</h4>
          <h4>Current timestamp: {this.state.currentTimestamp.toString()}</h4>
          <h3>You have been in {this.state.status} for {this.state.counter} </h3>

        </div>

        <div>
            <p>Happy {determineWeekday(this.state.currentWeekday)}!</p>
        </div>
        <div>
          <p>    H     M     S    </p>
          <p>{displayHours}:{displayMinutes}:{displaySeconds}</p>
        </div>
      </div>
    )
  }
}

export default DropDown
