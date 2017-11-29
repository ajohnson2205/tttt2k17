export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'

const initialState = {
  theTimestamp: new Date(),
  status: null,
  currentTimestamp: new Date(),
  currentWeekday: '',
  currentFullYear: '',
  currentMonth: '',
  currentDate: '',
  currentHours: '',
  currentMinutes: '',
  currentSeconds: '',
  timeInCurrentStatus: '',
  eventDuration: 0,
  snapshotStatus: null,
  snapshotTimestamp: null,
  userID: 12,
  userTimes: [],
  eventUserAggTimes: [],
  color: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}
