import { action } from './';
import { RULES_GET } from '../constants/actionTypes';

export const getRules = {
    request: (id) => action(RULES_GET.REQUEST),
    success: (response) => action(RULES_GET.SUCCESS, { response }),
    failure: (error) => action(RULES_GET.FAILURE, { error })
}