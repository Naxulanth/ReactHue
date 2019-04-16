import { ROUTINE_CREATE, ROUTINE_DELETE } from "../constants/actionTypes";

const schedules = (state = [], action) => {
  switch (action.type) {
    case ROUTINE_CREATE.REQUEST:
      return { ...state, isCreating: true };
    case ROUTINE_CREATE.SUCCESS:
      return { ...state, isCreating: false };
    case ROUTINE_CREATE.FAILURE:
      return state;
    case ROUTINE_DELETE.REQUEST:
    return { ...state, isDeleting: true };
    case ROUTINE_DELETE.SUCCESS:
    return { ...state, isDeleting: false };
    case ROUTINE_DELETE.FAILURE:
      return state;
    default:
      return state;
  }
};

export default schedules;
