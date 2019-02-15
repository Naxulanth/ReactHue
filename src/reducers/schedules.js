import { SCHEDULES_GET, SCHEDULE_CREATE, SCHEDULE_DELETE, SCHEDULE_GET, SCHEDULE_PUT } from '../constants/actionTypes'; 

const schedules = (state = [], action) => {
    switch (action.type) {
        case SCHEDULES_GET.REQUEST:
            return state;
        case SCHEDULES_GET.SUCCESS:
        console.log(action)
            return {
                ...state,
                list: action.response,
            }
        case SCHEDULES_GET.FAILURE:
            return state;
        case SCHEDULE_CREATE.REQUEST:
            return state;
        case SCHEDULE_CREATE.SUCCESS:
            return state;
        case SCHEDULE_CREATE.FAILURE:
            return state;
        case SCHEDULE_GET.REQUEST:
            return state;
        case SCHEDULE_GET.SUCCESS:
            return {
                ...state,
                activeSchedule: {
                    [action.response.data.name]: action.response.data
                }
            }
        case SCHEDULE_GET.FAILURE:
            return state;
        case SCHEDULE_DELETE.REQUEST:
            return state;
        case SCHEDULE_DELETE.SUCCESS:
        return {
            ...state,
            deletedSchedule: action.response.data[0].success
        }
        case SCHEDULE_DELETE.FAILURE:
            return state;
        case SCHEDULE_PUT.REQUEST:
            return state;
        case SCHEDULE_PUT.SUCCESS:
            return {
                ...state,
                createdSchedule: action.response.data[0].success.id
            }
        case SCHEDULE_PUT.FAILURE:
            return state;
        default:
            return state;
    }
}

export default schedules;