
import { user, bridge } from './localStorage.js'

const WRAPPER = 'http://' + localStorage.getItem(bridge) + '/api/' + localStorage.getItem(user)
export const GROUPS = WRAPPER + '/groups'
export const LIGHTS = WRAPPER + '/lights'