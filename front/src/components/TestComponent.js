import React, {Component} from 'react';
import { connect } from 'react-redux';


import {
  eventUserAggTimes

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
          console.log("xxxxxxxxxx", this.props.status)
          if (this.props.status.status_name !== this.props.status) {
            this.props.createEvent(
              this.props.theTimestamp,
              this.props.status,
              this.props.currentStatus,
              this.props.eventDuration,
              this.props.currentTimestamp,
              this.props.userID);
            this.props.updateBackgroundColor(this.props.index);
            this.props.eventUserAggTimes();


            }}}
            ><a>{this.props.status.status_name}</a></div>

    )
  }


}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = {
  eventUserAggTimes
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)
