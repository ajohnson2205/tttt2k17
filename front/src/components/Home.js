import React, { Component } from 'react';

import { connect } from 'react-redux';

import NavBar from './NavBar.js'

class Home extends Component {
  constructor(props) {
    super(props)
  }





  render() {
    return(
      <div>
        <NavBar />
        <p>Home</p>

      </div>
  )
  }
}


const mapStateToProps = state => {
  return {
    ...state
  }
}


export default connect(mapStateToProps, null)(Home)
