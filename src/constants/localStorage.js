const queryString = require('query-string');

const parsed = queryString.parse(window.location.search);

export let user = 'HUE_REACT_USERNAME';
export let bridge = 'HUE_REACT_BRIDGE_IP';

if (parsed['bridge']) {
    user += '_' + parsed['bridge'];
    bridge += '_' + parsed['bridge'];
}

