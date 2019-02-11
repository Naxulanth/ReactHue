import { action } from './';

import { SCHEDULES_GET, SCHEDULE_PUT, SCHEDULE_DELETE, SCHEDULE_GET, SCHEDULE_CREATE } from '../constants/actionTypes';


export const getSchedules = {
    request: () => action(SCHEDULES_GET.REQUEST),
    success: (response) => action(SCHEDULES_GET.SUCCESS, { response }),
    failure: (error) => action(SCHEDULES_GET.FAILURE, { error })
}

export const createSchedule = {
    request: (body) => action(SCHEDULE_CREATE.REQUEST, { body }),
    success: (response) => action(SCHEDULE_CREATE.SUCCESS, { response }),
    failure: (error) => action(SCHEDULE_CREATE.FAILURE, { error })
}

export const deleteSchedule = {
    request: (id) => action(SCHEDULE_DELETE.REQUEST, { id, body }),
    success: (response) => action(SCHEDULE_DELETE.SUCCESS, { response }),
    failure: (error) => action(SCHEDULE_DELETE.FAILURE, { error })
}

export const setSchedule = {
    request: (id, body) => action(SCHEDULE_PUT.REQUEST, { id, body }),
    success: (response) => action(SCHEDULE_PUT.SUCCESS, { response }),
    failure: (error) => action(SCHEDULE_PUT.FAILURE, { error })
}

export const getSchedule = {
    request: (id, body) => action(SCHEDULE_GET.REQUEST, { id, body }),
    success: (response) => action(SCHEDULE_GET.SUCCESS, { response }),
    failure: (error) => action(SCHEDULE_GET.FAILURE, { error })
}