import initialState from './initialState';
import
  {
  WRITE_AVAILABLE_STATUSES,
  RESET_STORE
  }
from '../actions/actionTypes';

export default function wizard(state = initialState, action) {
  let newState;
  switch(action.type) {
    case WRITE_AVAILABLE_STATUSES:
      console.log('WRITE_AVAILABLE_STATUSES', action)
      return Object.assign({}, state, action.payload)
    case RESET_STORE:
        console.log('Resetting the store', action)
        return Object.assign({}, state, initialState)
    default:
      return state;
  }
}
