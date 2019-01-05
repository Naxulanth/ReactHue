import {combineReducers} from 'redux'

import lights from './lights';
import rooms from './rooms';
import scenes from './scenes';

const reducers = {
    lights,
    rooms,
    scenes
}

export default combineReducers(reducers)