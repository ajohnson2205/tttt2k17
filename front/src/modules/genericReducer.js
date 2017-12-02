import initialState from './initialState';
import
  {
  WRITE_AVAILABLE_STATUSES,
  UPDATE_THE_TIMESTAMP,
  GET_EVENT_USER_AGG_TIMES
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
        currentSeconds: action.payload.currentSeconds
      })
    case GET_EVENT_USER_AGG_TIMES + "_FULFILLED":
      return Object.assign({}, state, {
        eventUserAggTimes: action.payload.data
      })
    default :
      return state;
  }
}
