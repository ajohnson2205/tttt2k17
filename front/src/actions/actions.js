import axios from 'axios';

import {
  WRITE_AVAILABLE_STATUSES,
  UPDATE_THE_TIMESTAMP,
  GET_EVENT_USER_AGG_TIMES,
  DETERMINE_WEEKDAY,
  UPDATE_EVENT_DURATION,
  UPDATE_STATUS,
  UPDATE_EVENT_START_TIMESTAMP,
  EVENT_USER_AGG_TIMES_SAME_DAY,
  EVENT_USER_AGG_TIMES_LAST_SEVEN_DAYS,
  EVENT_USER_AGG_TIMES_LAST_TWENTY_EIGHT_DAYS

}
  from './actionTypes';


// (1) Function to get the list of statuses to render as buttons for users to choose from
export function acceptAvailableStatuses (data) {
  const request =
    axios
    .get('http://localhost:4000/api/statusesAvailableForChoosing')

  return {
    type: WRITE_AVAILABLE_STATUSES,
    payload: request

  }
}


export function updateEventStartTimestamp (data) {
  var currentTimestamp = new Date()
  var currentWeekday = currentTimestamp.getDay()
  var currentSeconds = currentTimestamp.getSeconds()
  return {
    type: UPDATE_THE_TIMESTAMP,
    payload: {
      currentTimestamp: currentTimestamp,
      currentWeekday: currentWeekday,
      currentSeconds: currentSeconds,
    }
  }
}

export function eventUserAggTimes (data) {
  const request =
    axios
    .get('http://localhost:4000/api/eventUserAggTimes')

  return {
    type: GET_EVENT_USER_AGG_TIMES,
    payload: request

  }
}


export function eventUserAggTimesSameDay (data) {
  const request =
    axios
    .get('http://localhost:4000/api/eventUserAggTimesSameDay')

  return {
    type: EVENT_USER_AGG_TIMES_SAME_DAY,
    payload: request

  }
}

export function eventUserAggTimesLastSevenDays (data) {
  const request =
    axios
    .get('http://localhost:4000/api/eventUserAggTimesLastSevenDays')

  return {
    type: EVENT_USER_AGG_TIMES_LAST_SEVEN_DAYS,
    payload: request

  }
}

export function eventUserAggTimesLastTwentyEightDays (data) {
  const request =
    axios
    .get('http://localhost:4000/api/eventUserAggTimesLastTwentyEightDays')

  return {
    type: EVENT_USER_AGG_TIMES_LAST_TWENTY_EIGHT_DAYS,
    payload: request

  }
}
export function determineWeekday (data) {
  return {
    type: DETERMINE_WEEKDAY,
    payload: "Saturday"
}}


export function updateEventDuration () {
  return {
    type: UPDATE_EVENT_DURATION
  }
}

export function updateStatus(data) {
  return {
    type: UPDATE_STATUS,
    payload: data
  }
}

export function updateEventStartTimeTimestamp() {
  return {
    type: UPDATE_EVENT_START_TIMESTAMP,
    payload: new Date()
  }
}
