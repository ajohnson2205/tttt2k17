import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import genericReducer from './genericReducer.js'


export default combineReducers({
  routing: routerReducer,
  genericReducer
})
