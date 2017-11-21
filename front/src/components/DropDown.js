import React, { Component } from 'react';
// import '../paper.css';
import statuses from '../tempData/statuses.js'
import axios from 'axios';


class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'no status selected',
      theTimestamp: new Date(),
      currentTimestamp: new Date(),
      currentWeekday: '',
      timeInCurrentStatus: '',
      counter: 0,
      snapshotStatus: null,
      snapshotTimestamp: null,
      userID: 12,
      theResponse: []
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
        this.setState({theResponse: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
    }

    //get help writing handleStatusChange

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
            this.setState(
            {
              status: status.name,
              theTimestamp: new Date(),
              counter:0
            })
          this.createEvent(new Date(), status.name, this.state.userID)}}}
          >{status.name}</div>
      )
    })


    var userTimes = this.state.theResponse.map(response => {
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
              counter:0
            })
          this.createEvent(new Date(), e.target.value, this.state.userID)}}>
            {statusOptions}
          </select>
        </div> */}




        <div>
          <h1>{this.state.status}</h1>
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
        <div className="status-box-container">
        {statusBoxes}
        </div>
        <div>
          {userTimes}
        </div>
      </div>
    )
  }
}

export default DropDown
