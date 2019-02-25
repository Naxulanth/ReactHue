import { ROUTINE_CREATE } from "../constants/actionTypes";

const schedules = (state = [], action) => {
  switch (action.type) {
    case ROUTINE_CREATE.REQUEST:
      return { ...state, loading: true };
    case ROUTINE_CREATE.SUCCESS:
      return { ...state, loading: false };
    case ROUTINE_CREATE.FAILURE:
      return state;
    default:
      return state;
  }
};

export default schedules;
