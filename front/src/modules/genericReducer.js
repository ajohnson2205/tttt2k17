import initialState from './initialState';
import
  {
    WRITE_AVAILABLE_STATUSES,
    UPDATE_THE_TIMESTAMP,
    GET_EVENT_USER_AGG_TIMES,
    DETERMINE_WEEKDAY,
    UPDATE_EVENT_DURATION
  }
  from '../actions/actionTypes';

export default function statuses (state = initialState, action) {
  console.log(action.type)
  let newState;
  switch(action.type) {
    case WRITE_AVAILABLE_STATUSES + "_FULFILLED" :
      return Object.assign({}, state, { statusesAvailableForChoosing: action.payload.data
      })
    case UPDATE_THE_TIMESTAMP :
      return Object.assign({}, state, {
        currentTimestamp: action.payload.currentTimestamp,
        currentWeekday: action.payload.currentWeekday,
        currentSeconds: action.payload.currentSeconds,
        eventDuration: state.eventDuration + 1
      })
    case GET_EVENT_USER_AGG_TIMES + "_FULFILLED":
      return Object.assign({}, state, {
        eventUserAggTimes: action.payload.data
      })
    case DETERMINE_WEEKDAY :
      return Object.assign({}, state, {
        weekday: action.payload
      })
    case UPDATE_EVENT_DURATION :
      return Object.assign({}, state, {
        eventDuration: 0
      })
    default :
      return state;
  }
}
