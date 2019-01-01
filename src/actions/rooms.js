import { action } from './';

import { ROOMS_GET, ROOMS_PUT, ROOM_GET } from '../constants/actionTypes';


export const getRooms = {
    request: () => action(ROOMS_GET.REQUEST),
    success: (response) => action(ROOMS_GET.SUCCESS, { response }),
    failure: (error) => action(ROOMS_GET.FAILURE, { error })
}

export const modifyRoom = {
    request: (id, body) => action(ROOMS_PUT.REQUEST, { id, body }),
    success: (response) => action(ROOMS_PUT.SUCCESS, { response }),
    failure: (error) => action(ROOMS_PUT.FAILURE, { error })
}

export const getRoomById = {
    request: (id) => action(ROOM_GET.REQUEST, { id }),
    success: (response) => action(ROOM_GET.SUCCESS, { response }),
    failure: (error) => action(ROOM_GET.FAILURE, { error })
}