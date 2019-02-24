import { action } from "./";

import { ROOMS_GET, ROOMS_PUT, ROOMS_PUT_ATTR, ROOMS_CREATE } from "../constants/actionTypes";

export const getRooms = {
  request: () => action(ROOMS_GET.REQUEST),
  success: response => action(ROOMS_GET.SUCCESS, { response }),
  failure: error => action(ROOMS_GET.FAILURE, { error })
};

export const modifyRoom = {
  request: (id, body) => action(ROOMS_PUT.REQUEST, { id, body }),
  success: response => action(ROOMS_PUT.SUCCESS, { response }),
  failure: error => action(ROOMS_PUT.FAILURE, { error })
};

export const modifyRoomAttr = {
  request: (id, body) => action(ROOMS_PUT_ATTR.REQUEST, { id, body }),
  success: response => action(ROOMS_PUT_ATTR.SUCCESS, { response }),
  failure: error => action(ROOMS_PUT_ATTR.FAILURE, { error })
};

export const createRoom = {
  request: body => action(ROOMS_CREATE.REQUEST, { body }),
  success: response => action(ROOMS_CREATE.SUCCESS, { response }),
  failure: error => action(ROOMS_CREATE.FAILURE, { error })
};
