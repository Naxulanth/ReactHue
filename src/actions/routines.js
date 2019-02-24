import { action } from "./";

import { ROUTINE_CREATE } from "../constants/actionTypes";

export const createRoutine = {
  request: (body) => action(ROUTINE_CREATE.REQUEST, { body }),
  success: response => action(ROUTINE_CREATE.SUCCESS, { response }),
  failure: error => action(ROUTINE_CREATE.FAILURE, { error })
};
