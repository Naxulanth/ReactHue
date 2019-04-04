import { action } from "./";

import { ROUTINE_CREATE, ROUTINE_DELETE } from "../constants/actionTypes";

export const createRoutine = {
  request: (body) => action(ROUTINE_CREATE.REQUEST, { body }),
  success: response => action(ROUTINE_CREATE.SUCCESS, { response }),
  failure: error => action(ROUTINE_CREATE.FAILURE, { error })
};

export const deleteRoutine = {
  request: (id) => action(ROUTINE_DELETE.REQUEST, { id }),
  success: response => action(ROUTINE_DELETE.SUCCESS, { response }),
  failure: error => action(ROUTINE_DELETE.FAILURE, { error })
};