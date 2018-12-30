import { action } from './';

import { LIGHTS_GET } from '../constants/actionTypes';


export const getLights = {
    request: () => action(LIGHTS_GET.REQUEST),
    success: (response) => action(LIGHTS_GET.SUCCESS, { response }),
    failure: (error) => action(LIGHTS_GET.FAILURE, { error })
}