import { action } from './';

import { ROOMS_GET } from '../constants/actionTypes';


export const getRooms = {
    request: () => action(ROOMS_GET.REQUEST),
    success: (response) => action(ROOMS_GET.SUCCESS, { response }),
    failure: (error) => action(ROOMS_GET.FAILURE, { error })
}