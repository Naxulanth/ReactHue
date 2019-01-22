import { action } from './';

import { LIGHTS_GET, LIGHTS_PUT, LIGHTS_PUT_ATTR  } from '../constants/actionTypes';


export const getLights = {
    request: () => action(LIGHTS_GET.REQUEST),
    success: (response) => action(LIGHTS_GET.SUCCESS, { response }),
    failure: (error) => action(LIGHTS_GET.FAILURE, { error })
}

export const modifyLight = {
    request: (id, body) => action(LIGHTS_PUT.REQUEST, { id, body }),
    success: (response) => action(LIGHTS_PUT.SUCCESS, { response }),
    failure: (error) => action(LIGHTS_PUT.FAILURE, { error })
}

export const modifyLightAttr = {
    request: (id, body) => action(LIGHTS_PUT_ATTR.REQUEST, { id, body }),
    success: (response) => action(LIGHTS_PUT_ATTR.SUCCESS, { response }),
    failure: (error) => action(LIGHTS_PUT_ATTR.FAILURE, { error })
}

