import {
  RULES_GET,
  RULE_CREATE,
  RULE_DELETE,
  RULE_PUT
} from "../constants/actionTypes";

const rules = (state = [], action) => {
  switch (action.type) {
    case RULES_GET.REQUEST:
      return state;
    case RULES_GET.SUCCESS:
      return {
        ...state,
        list: action.response.data
      };
    case RULES_GET.FAILURE:
      return state;
    case RULE_CREATE.REQUEST:
      return state;
    case RULE_CREATE.SUCCESS:
      return {
        ...state,
        createdRule: action.response.data[0].success.id
      };
    case RULE_CREATE.FAILURE:
      return state;
    case RULE_DELETE.REQUEST:
      return state;
    case RULE_DELETE.SUCCESS:
      return state;
    case RULE_DELETE.FAILURE:
      return state;
    case RULE_PUT.REQUEST:
      return state;
    case RULE_PUT.SUCCESS:
      return state;
    case RULE_PUT.FAILURE:
      return state;
    default:
      return state;
  }
};

export default rules;
