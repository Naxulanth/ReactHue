import { RULES_GET } from '../constants/actionTypes'; 

const rules = (state = [], action) => {
    switch (action.type) {
        case RULES_GET.REQUEST:
            return state;
        case RULES_GET.SUCCESS:
            return {
                ...state,
                list: action.response.data
            }
        case RULES_GET.FAILURE:
            return state;
        default:
            return state;
    }
}

export default rules;