import { user, bridge } from './localStorage.js'

const WRAPPER = 'http://' + localStorage.getItem(bridge) + '/api/' + localStorage.getItem(user)
export const GROUPS = WRAPPER + '/groups'
export const LIGHTS = WRAPPER + '/lights'
export const SCENES = WRAPPER + '/scenes'
export const SCHEDULES = WRAPPER + '/schedules'
export const RESOURCES = WRAPPER + '/resourcelinks'