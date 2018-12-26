
import { user, bridge } from './localStorage.js'

const WRAPPER = 'http://' + localStorage.getItem(bridge) + '/api/' + localStorage.getItem(user)
const GROUPS = WRAPPER + '/groups'

export { GROUPS };