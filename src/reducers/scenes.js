import { SCENES_GET, SCENE_GET, SCENES_PUT } from '../constants/actionTypes';

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
            console.log(action)
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
        default:
            return state;
    }
}

export default SCENES;