import React, {Component} from 'react';
import { connect } from 'react-redux';


import {
  eventUserAggTimes,
  updateEventDuration,
  updateStatus,
  updateEventStartTimeTimestamp

 } from '../actions/actions.js'


class TestComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class: 'status-box'
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.index === nextProps.indexToUpdate) {
      this.setState({class: "status-box-active"})
    }

    else if (this.props.index !== nextProps.indexToUpdate && this.state.class === 'status-box-active') {
      this.setState({class: 'status-box'})
    }
  }

  render() {
    return(
      <div
        key={this.props.index}
        className={this.state.class}
        onClick={(e) => {
          if (this.props.status.status_name !== this.props.genericReducer.status) {
            this.props.createEvent(
              this.props.genericReducer.eventStartTimestamp,
              this.props.genericReducer.status,
              this.props.genericReducer.eventDuration,
              this.props.genericReducer.currentTimestamp,
              this.props.genericReducer.userID);
            this.props.updateBackgroundColor(this.props.index);
            this.props.eventUserAggTimes();
            this.props.updateStatus(this.props.status);
            this.props.updateEventStartTimeTimestamp();
            this.props.updateEventDuration();


            }}}
            ><a>{this.props.status.status_name.toUpperCase()}</a></div>

    )
  }


}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = {
  eventUserAggTimes,
  updateStatus,
  updateEventStartTimeTimestamp,
  updateEventDuration
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)
