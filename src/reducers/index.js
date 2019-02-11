import {combineReducers} from 'redux'

import lights from './lights';
import rooms from './rooms';
import scenes from './scenes';
import schedules from './schedules';

const reducers = {
    lights,
    rooms,
    scenes,
    schedules
}

export default combineReducers(reducers)