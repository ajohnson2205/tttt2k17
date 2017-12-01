import React, { Component } from 'react';
// import '../paper.css';
import statuses from '../tempData/statuses.js'
import axios from 'axios';

import TestComponent from './TestComponent.js'

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
      eventUserAggTimes: [],
      color: "",
      searchResultArray: [],
      idToHighlight: "",
      class: "status-box",
      updateClass: "status-box-active",
      indexToUpdate: "",
      statusesAvailableForChoosing: []
    }
  }




  componentDidMount() {
    const userInfo = axios.get('http://localhost:4000/dropdown', {withCredentials: true}).then( res => {
        console.log(res)
        return res.data
    })

    this.eventUserAggTimes();
    this.statusesAvailableForChoosing();

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
      // if (this.state.currentSeconds % 10 === 0) {
      //   this.setState({snapshotStatus: this.state.status, snapshotTimestamp: this.state.currentTimestamp});
      //   this.createSnapshot();
      //   // this.trackUserTimes();
      // };
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


    createEvent = (theTimestamp, status, currentStatus, eventDuration, currentTimestamp, userID) => {
      axios
        .post('http://localhost:4000/api/events', {theTimestamp, currentStatus, eventDuration, currentTimestamp, userID})
        .then(  (res) => {
          console.log('I am status', status)
          console.log('I am current time stamp', currentTimestamp)


          this.setState({
                    status: status.status_name,
                    theTimestamp: this.state.currentTimestamp,
                    eventDuration:0,
                  })



          })
        .catch((error) => {
        console.log(error);
        })
    }


    searchStatuses = (searchInput) => {
      console.log(searchInput)
      axios
        .get('http://localhost:4000/api/statuses?searchValue=' + this.state.statusSearchValue

        )
        .then((response) => {
          this.setState({searchResultArray: response.data})
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

    statusesAvailableForChoosing = () => {
      axios
      .get('http://localhost:4000/api/statusesAvailableForChoosing')
      .then((response) => {
        console.log(response)
        this.setState({statusesAvailableForChoosing: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
    }

    updateBackgroundColor = (index) => {
      this.setState({indexToUpdate: index})
    }












  render() {



    var statusBoxes = this.state.statusesAvailableForChoosing.map((status, index) => {
      return (
        <div>
          <br></br>
          <TestComponent
            status={status}
            index={index}
            currentStatus={this.state.status}
            theTimestamp={this.state.theTimestamp}
            eventDuration={this.state.eventDuration}
            currentTimestamp={this.state.currentTimestamp}
            userID={this.state.userID}
            indexToUpdate={this.state.indexToUpdate} updateBackgroundColor={this.updateBackgroundColor}
            createEvent={this.createEvent}
            eventUserAggTimes={this.eventUserAggTimes}
          />
        </div>
      )
    })

//
// THE ORIGINAL STUFF
//     <div
//       className={this.state.class}
//       onClick={(e) => {
//         if (status.name !== this.state.status) {
//           this.createEvent(
//             this.state.theTimestamp,
//             this.state.status,
//             this.state.eventDuration,
//             this.state.currentTimestamp,
//             this.state.userID);
//
//           this.setState({
//             status: status.name,
//             theTimestamp: this.state.currentTimestamp,
//             eventDuration:0,
//             idToHighlight: index,
//             class: 'status-box-active'
//           })
//           this.eventUserAggTimes();
//         }}}
//       ><a>{status.name}</a></div>










    // var userTimes = this.state.userTimes.map(response => {
    //   return(
    //     <div>{response.snapshot_status} : {response.status_duration}</div>
    //   )})

    var eventUserAggTimesRender = this.state.eventUserAggTimes.map(event => {
      if (event.event_status === this.state.status) {
      return(
        <div>{event.event_status} : {parseInt(event.status_duration) + parseInt( this.state.eventDuration)}</div>
      )}
      else {
        return(
          <div>{event.event_status} : {event.status_duration}</div>
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
            onChange={(e) => {this.setState({statusSearchValue: e.target.value}, () => {
              this.searchStatuses(this.state.statusSearchValue)
          });
             }}
            ></input>


        </div>



{/* Basic information about what's going on now */}
        <div>
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
        {/* <div>
          {userTimes}
        </div> */}


{/* Improved dynamic render of how long a user has been in each status */}
        <div>
          {eventUserAggTimesRender}
        </div>

      </div>
    )
  }
}

export default DropDown
