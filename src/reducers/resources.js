import { RESOURCES_GET } from '../constants/actionTypes'; 

const resources = (state = [], action) => {
    switch (action.type) {
        case RESOURCES_GET.REQUEST:
            return state;
        case RESOURCES_GET.SUCCESS:
            return {
                ...state,
                list: action.response.data
            }
        case RESOURCES_GET.FAILURE:
            return state;
        default:
            return state;
    }
}

export default resources;