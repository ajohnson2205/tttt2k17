import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


class PieChartSameDay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <p>Some content</p>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, null)(PieChartSameDay)
