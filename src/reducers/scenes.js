import {
  SCENES_GET,
  SCENE_GET,
  SCENES_PUT,
  SCENE_LIGHTS_PUT,
  SCENE_POST,
  SCENE_DELETE,
  CLEAR_EDITS
} from "../constants/actionTypes";

const scenes = (state = [], action) => {
  switch (action.type) {
    case SCENES_GET.REQUEST:
      return state;
    case SCENES_GET.SUCCESS:
      return {
        ...state,
        list: action.response.data
      };
    case SCENES_GET.FAILURE:
      return state;
    case SCENES_PUT.REQUEST:
      return state;
    case SCENES_PUT.SUCCESS:
      return state;
    case SCENES_PUT.FAILURE:
      return state;
    case SCENE_GET.REQUEST:
      return {
        ...state
      };
    case SCENE_GET.SUCCESS:
      let editData = {};
      let activeScenes = Object.assign({}, state.activeScenes);
      if (action.response.data.edit) {
        editData = Object.assign({}, state.editData);
        if (!editData[action.response.data.edit])
          editData[action.response.data.edit] = {};
        editData[action.response.data.edit][action.response.data.id] =
          action.response.data;
      } else {
        activeScenes[action.response.data.group] = action.response.data;
      }
      return {
        ...state,
        activeScenes: activeScenes,
        editData: editData,
        completed: action.response.data.completed
      };
    case SCENE_GET.FAILURE:
      return state;
    case SCENE_LIGHTS_PUT.REQUEST:
      return state;
    case SCENE_LIGHTS_PUT.SUCCESS:
      return state;
    case SCENE_LIGHTS_PUT.FAILURE:
      return state;
    case CLEAR_EDITS.REQUEST:
      let tempEditData = Object.assign({}, state.editData);
      tempEditData[action.id] = {};
      return {
        ...state,
        editData: tempEditData
      };
    case CLEAR_EDITS.SUCCESS:
      return state;
    case CLEAR_EDITS.FAILURE:
      return state;
    case SCENE_POST.REQUEST:
      return state;
    case SCENE_POST.SUCCESS:
      return {
        ...state,
        createdScene: action.response.data[0].success.id
      };
    case SCENE_POST.FAILURE:
      return state;
    case SCENE_DELETE.REQUEST:
      return state;
    case SCENE_DELETE.SUCCESS:
      return {
        ...state,
        deletedScene: action.response.data[0].success
      };
    case SCENE_DELETE.FAILURE:
      return state;
    default:
      return state;
  }
};

export default scenes;
