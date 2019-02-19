import { action } from './';
import { RESOURCES_GET } from '../constants/actionTypes';

export const getResources = {
    request: (id) => action(RESOURCES_GET.REQUEST),
    success: (response) => action(RESOURCES_GET.SUCCESS, { response }),
    failure: (error) => action(RESOURCES_GET.FAILURE, { error })
}