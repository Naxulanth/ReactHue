import { action } from "./";
import {
  RESOURCES_GET,
  RESOURCE_CREATE,
  RESOURCE_PUT,
  RESOURCE_DELETE
} from "../constants/actionTypes";

export const getResources = {
  request: () => action(RESOURCES_GET.REQUEST),
  success: response => action(RESOURCES_GET.SUCCESS, { response }),
  failure: error => action(RESOURCES_GET.FAILURE, { error })
};

export const createResource = {
  request: body => action(RESOURCE_CREATE.REQUEST, { body }),
  success: response => action(RESOURCE_CREATE.SUCCESS, { response }),
  failure: error => action(RESOURCE_CREATE.FAILURE, { error })
};

export const modifyResource = {
  request: (id, body) => action(RESOURCE_PUT.REQUEST, { id, body }),
  success: response => action(RESOURCE_PUT.SUCCESS, { response }),
  failure: error => action(RESOURCE_PUT.FAILURE, { error })
};

export const deleteResource = {
  request: id => action(RESOURCE_DELETE.REQUEST, { id }),
  success: response => action(RESOURCE_DELETE.SUCCESS, { response }),
  failure: error => action(RESOURCE_DELETE.FAILURE, { error })
};
