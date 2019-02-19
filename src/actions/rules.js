import { action } from './';
import { RULES_GET, RULE_CREATE, RULE_PUT } from '../constants/actionTypes';

export const getRules = {
    request: () => action(RULES_GET.REQUEST),
    success: (response) => action(RULES_GET.SUCCESS, { response }),
    failure: (error) => action(RULES_GET.FAILURE, { error })
}

export const createRule = {
    request: (body) => action(RULE_CREATE.REQUEST, { body }),
    success: (response) => action(RULE_CREATE.SUCCESS, { response }),
    failure: (error) => action(RULE_CREATE.FAILURE, { error })
}

export const modifyRule = {
    request: (id, body) => action(RULE_PUT.REQUEST, { id, body }),
    success: (response) => action(RULE_PUT.SUCCESS, { response }),
    failure: (error) => action(RULE_PUT.FAILURE, { error })
}