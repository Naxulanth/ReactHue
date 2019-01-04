import { action } from './';

import { SCENES_GET, SCENES_PUT, SCENE_GET } from '../constants/actionTypes';


export const getScenes = {
    request: () => action(SCENES_GET.REQUEST),
    success: (response) => action(SCENES_GET.SUCCESS, { response }),
    failure: (error) => action(SCENES_GET.FAILURE, { error })
}

export const getScene = {
    request: (id) => action(SCENE_GET.REQUEST, { id }),
    success: (response) => action(SCENE_GET.SUCCESS, { response }),
    failure: (error) => action(SCENE_GET.FAILURE, { error })
}

export const modifyScene = {
    request: (id, body) => action(SCENES_PUT.REQUEST, { id, body }),
    success: (response) => action(SCENES_PUT.SUCCESS, { response }),
    failure: (error) => action(SCENES_PUT.FAILURE, { error })
}