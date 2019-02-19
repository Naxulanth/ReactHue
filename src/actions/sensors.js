import { action } from './';
import { SENSORS_GET } from '../constants/actionTypes';

export const getSensors = {
    request: (id) => action(SENSORS_GET.REQUEST),
    success: (response) => action(SENSORS_GET.SUCCESS, { response }),
    failure: (error) => action(SENSORS_GET.FAILURE, { error })
}