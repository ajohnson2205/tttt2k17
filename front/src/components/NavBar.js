import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux';

import {
  acceptAvailableStatuses,
  updateTheTimestamp,
  eventUserAggTimes

 } from '../actions/actions.js'


class NavBar extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.props.acceptAvailableStatuses();
    this.props.eventUserAggTimes();
    setInterval(() => {
      this.props.updateTheTimestamp();
    }, 1000)
  }



  render() {
    return(
    <p>NavBar</p>
  )
  }
}


const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = {
  acceptAvailableStatuses,
  updateTheTimestamp,
  eventUserAggTimes
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
