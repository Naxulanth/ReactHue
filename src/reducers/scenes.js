import { SCENES_GET, SCENE_GET, SCENES_PUT, SCENE_LIGHTS_PUT, SCENE_POST, SCENE_DELETE } from '../constants/actionTypes';

const SCENES = (state = [], action) => {
    switch (action.type) {
        case SCENES_GET.REQUEST:
            return state;
        case SCENES_GET.SUCCESS:
            return {
                ...state,
                list: action.response.data,
            }
        case SCENES_GET.FAILURE:
            return state;
        case SCENES_PUT.REQUEST:
            return state;
        case SCENES_PUT.SUCCESS:
            return state;
        case SCENES_PUT.FAILURE:
            return state;
        case SCENE_GET.REQUEST:
            return state;
        case SCENE_GET.SUCCESS:
            return {
                ...state,
                activeScenes: {
                    [action.response.data.group]: action.response.data
                }
            }
        case SCENE_GET.FAILURE:
            return state;
        case SCENE_LIGHTS_PUT.REQUEST:
            return state;
        case SCENE_LIGHTS_PUT.SUCCESS:
            return state;
        case SCENE_LIGHTS_PUT.FAILURE:
            return state;
        case SCENE_POST.REQUEST:
            return state;
        case SCENE_POST.SUCCESS:
            return {
                ...state,
                createdScene: action.response.data[0].success.id
            }
        case SCENE_POST.FAILURE:
            return state;
        case SCENE_DELETE.REQUEST:
            return state;
        case SCENE_DELETE.SUCCESS:
            return {
                ...state,
                deletedScene: action.response.data[0].success
            }
        case SCENE_DELETE.FAILURE:
            return state;
        default:
            return state;
    }
}

export default SCENES;