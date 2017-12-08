import React, { Component } from 'react';
import { connect } from 'react-redux'


import NavBar from './NavBar.js'

import
  {
  secondsToHHMMSS
  }
  from '../miscFunctions.js'



class TotalStatus extends Component {
  constructor(props) {
    super(props)
  }


  render() {



    var eventUserAggTimesRender = this.props.genericReducer.eventUserAggTimes.map(event => {
      if(event.event_status === this.props.genericReducer.status) {
        var runningDuration = parseInt(event.status_duration) + this.props.genericReducer.eventDuration
        return(
          <div key={event.event_status}>
            <div>{event.event_status} : {secondsToHHMMSS(runningDuration)}</div>
          </div>
        )
      }
      else {
        return(
          <div key={event.event_status}>
            <div>{event.event_status} : {secondsToHHMMSS(event.status_duration)}</div>
          </div>
        )
      }
    }
    )



    var eventUserAggTimesSameDayRender = this.props.genericReducer.eventUserAggTimesSameDay.map(event => {
      if(event.event_status === this.props.genericReducer.status) {
        var runningDuration = parseInt(event.status_duration) + this.props.genericReducer.eventDuration
        return(
          <div key={event.event_status}>
            <div>{event.event_status} : {secondsToHHMMSS(runningDuration)}</div>
          </div>
        )
      }
      else {
        return(
          <div key={event.event_status}>
            <div>{event.event_status} : {secondsToHHMMSS(event.status_duration)}</div>
          </div>
        )
      }
    }
    )




    return(
      <div>
        <NavBar />
        <p>Statuses</p>
        <div>
          {eventUserAggTimesRender}
        </div>
        <br />
        <br />
        <div>
          {eventUserAggTimesSameDayRender}
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


export default connect(mapStateToProps, null)(TotalStatus)
