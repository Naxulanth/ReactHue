import { SENSORS_GET, SENSOR_DELETE, SENSOR_CREATE, SENSOR_PUT } from '../constants/actionTypes'; 

const sensors = (state = [], action) => {
    switch (action.type) {
        case SENSORS_GET.REQUEST:
            return state;
        case SENSORS_GET.SUCCESS:
            return {
                ...state,
                list: action.response.data
            }
        case SENSORS_GET.FAILURE:
            return state;
        case SENSOR_CREATE.REQUEST:
            return state;
        case SENSOR_CREATE.SUCCESS:
        return {
            ...state,
            createSensor: action.response.data
        }
        case SENSOR_CREATE.FAILURE:
            return state;
        case SENSOR_DELETE.REQUEST:
            return state;
        case SENSOR_DELETE.SUCCESS:
            return state;
        case SENSOR_DELETE.FAILURE:
            return state;
        case SENSOR_PUT.REQUEST:
            return state;
        case SENSOR_PUT.SUCCESS:
            return state;
        case SENSOR_PUT.FAILURE:
            return state;
        default:
            return state;
    }
}

export default sensors;