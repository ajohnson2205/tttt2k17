import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux';

import { acceptAvailableStatuses } from '../actions/actions.js'


class NavBar extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
    this.statusesAvailableForChoosing();
  }


  statusesAvailableForChoosing = () => {
    axios
    .get('http://localhost:4000/api/statusesAvailableForChoosing')
    .then((response) => {
      console.log("THIS FUCKING THING", response)
      acceptAvailableStatuses(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
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
  acceptAvailableStatuses
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
