import initialState from './initialState';
import
  {
    WRITE_AVAILABLE_STATUSES,
    UPDATE_THE_TIMESTAMP,
    GET_EVENT_USER_AGG_TIMES,
    EVENT_USER_AGG_TIMES_SAME_DAY,
    EVENT_USER_AGG_TIMES_LAST_SEVEN_DAYS,
    EVENT_USER_AGG_TIMES_LAST_TWENTY_EIGHT_DAYS,
    DETERMINE_WEEKDAY,
    UPDATE_EVENT_DURATION,
    UPDATE_STATUS,
    UPDATE_EVENT_START_TIMESTAMP
  }
  from '../actions/actionTypes';

export default function statuses (state = initialState, action) {
  // console.log(action.type)
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

      case EVENT_USER_AGG_TIMES_SAME_DAY + "_FULFILLED":
        return Object.assign({}, state, {
          eventUserAggTimesSameDay: action.payload.data
        })

        case EVENT_USER_AGG_TIMES_LAST_SEVEN_DAYS + "_FULFILLED":
          return Object.assign({}, state, {
            eventUserAggTimesLastSevenDays: action.payload.data
          })

          case EVENT_USER_AGG_TIMES_LAST_TWENTY_EIGHT_DAYS + "_FULFILLED":
            return Object.assign({}, state, {
              eventUserAggTimesLastTwentyEightDays: action.payload.data
            })


    case UPDATE_EVENT_DURATION :
      return Object.assign({}, state, {
        eventDuration: 0
      })
    case UPDATE_STATUS :
      return Object.assign({}, state, {
        status: action.payload.status_name,
        imageURL: action.payload.image_url
      })
    case UPDATE_EVENT_START_TIMESTAMP :
      return Object.assign({}, state, {
        eventStartTimestamp: action.payload
      })
    default :
      return state;
  }
}
