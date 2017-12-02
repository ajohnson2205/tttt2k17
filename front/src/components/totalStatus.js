import React, { Component } from 'react';
import { connect } from 'react-redux'


import NavBar from './NavBar.js'




class TotalStatus extends Component {
  constructor(props) {
    super(props)
  }


  render() {

    var eventUserAggTimesRender = this.props.genericReducer.eventUserAggTimes.map(event => {
        return(
          <div key={event.event_status}>
            <div>{event.event_status} : {event.status_duration}</div>
          </div>
        )
      }
    )




    return(
      <div>
        <NavBar />
        <p>Statuses</p>
        <div>
          {eventUserAggTimesRender}
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
