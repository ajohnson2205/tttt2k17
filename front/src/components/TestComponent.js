import React, {Component} from 'react';

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
        className={this.state.class}
        onClick={(e) => {
          console.log("xxxxxxxxxx", this.props.status)
          if (this.props.currentStatus !== this.props.status) {
            this.props.createEvent(
              this.props.theTimestamp,
              this.props.status,
              this.props.currentStatus,
              this.props.eventDuration,
              this.props.currentTimestamp,
              this.props.userID);
            this.props.updateBackgroundColor(this.props.index)


            }}}
            ><a>{this.props.status.name}</a></div>

    )
  }


}

export default TestComponent;