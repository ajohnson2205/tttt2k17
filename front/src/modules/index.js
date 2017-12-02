import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import DropDown from './DropDown.js'


export default combineReducers({
  routing: routerReducer,
  DropDown
})
