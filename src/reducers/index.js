import {combineReducers} from 'redux'

import lights from './lights';
import rooms from './rooms';

const reducers = {
    lights,
    rooms
}

export default combineReducers(reducers)