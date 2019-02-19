import {combineReducers} from 'redux'

import lights from './lights';
import rooms from './rooms';
import scenes from './scenes';
import schedules from './schedules';
import resources from './resources';

const reducers = {
    lights,
    rooms,
    scenes,
    schedules,
    resources
}

export default combineReducers(reducers)