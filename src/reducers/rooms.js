import {
  ROOMS_GET,
  ROOMS_PUT,
  ROOMS_PUT_ATTR,
  ROOMS_CREATE
} from "../constants/actionTypes";

const rooms = (state = [], action) => {
  switch (action.type) {
    case ROOMS_GET.REQUEST:
      return state;
    case ROOMS_GET.SUCCESS:
      return {
        ...state,
        list: action.response.roomList,
        routines: action.response.routineGrups
      };
    case ROOMS_GET.FAILURE:
      return state;
    case ROOMS_PUT.REQUEST:
      return state;
    case ROOMS_PUT.SUCCESS:
      return state;
    case ROOMS_PUT.FAILURE:
      return state;
    case ROOMS_PUT_ATTR.REQUEST:
      return state;
    case ROOMS_PUT_ATTR.SUCCESS:
      return state;
    case ROOMS_PUT_ATTR.FAILURE:
      return state;
    case ROOMS_CREATE.REQUEST:
      return state;
    case ROOMS_CREATE.SUCCESS:
      return {
        ...state,
        createdSchedule: action.response.data[0].success.id
      };
    case ROOMS_CREATE.FAILURE:
      return state;
    default:
      return state;
  }
};

export default rooms;
