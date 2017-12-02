import {
  WRITE_AVAILABLE_STATUSES
}
  from './actionTypes';


export function acceptAvailableStatuses (data) {
  return {
    type: WRITE_AVAILABLE_STATUSES,
    payload: data
  }
}
