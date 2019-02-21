import {
  RESOURCES_GET,
  RESOURCE_CREATE,
  RESOURCE_DELETE,
  RESOURCE_PUT
} from "../constants/actionTypes";

const resources = (state = [], action) => {
  switch (action.type) {
    case RESOURCES_GET.REQUEST:
      return state;
    case RESOURCES_GET.SUCCESS:
      return {
        ...state,
        list: action.response.data
      };
    case RESOURCES_GET.FAILURE:
      return state;
    case RESOURCE_CREATE.REQUEST:
      return state;
    case RESOURCE_CREATE.SUCCESS:
      return {
        ...state,
        createdResource: action.response.data[0].success.id
      };
    case RESOURCE_CREATE.FAILURE:
      return state;
    case RESOURCE_DELETE.REQUEST:
      return state;
    case RESOURCE_DELETE.SUCCESS:
      return state;
    case RESOURCE_DELETE.FAILURE:
      return state;
    case RESOURCE_PUT.REQUEST:
      return state;
    case RESOURCE_PUT.SUCCESS:
      return state;
    case RESOURCE_PUT.FAILURE:
      return state;
    default:
      return state;
  }
};

export default resources;
