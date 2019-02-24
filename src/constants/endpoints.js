import { user, bridge } from './localStorage.js'

const WRAPPER = 'http://' + localStorage.getItem(bridge) + '/api/' + localStorage.getItem(user)
const WRAPPER_RAW = '/api/' + localStorage.getItem(user)

export const GROUPS = WRAPPER + '/groups'
export const LIGHTS = WRAPPER + '/lights'
export const SCENES = WRAPPER + '/scenes'
export const SCHEDULES = WRAPPER + '/schedules'
export const RESOURCES = WRAPPER + '/resourcelinks'
export const SENSORS = WRAPPER + '/sensors'
export const RULES = WRAPPER + '/rules'

export const GROUPS_RAW = WRAPPER_RAW + '/groups'
export const LIGHTS_RAW = WRAPPER_RAW + '/lights'
export const SCENES_RAW = WRAPPER_RAW + '/scenes'
export const SCHEDULES_RAW = WRAPPER_RAW + '/schedules'
export const RESOURCES_RAW = WRAPPER_RAW + '/resourcelinks'
export const SENSORS_RAW = WRAPPER_RAW + '/sensors'
export const RULES_RAW = WRAPPER_RAW + '/rules'

