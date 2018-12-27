function colorChanger() {
    let waypoints = { 'default': [[255, 0, 255], [0, 191, 255]], 'reverse': [[0, 191, 255], [255, 0, 255]] };
    let currentIndex = {};
    let frequency = { 'default': 500 };
    let loop = {};

    function initialize(frequency, waypoints, id) {
        if (!id) id = 'default';
        setFrequency(frequency, id);
        setWaypoints(waypoints, id);
    }

    function setFrequency(e, id) {
        if (!id) id = 'default';
        frequency[id] = e;
    }

    function setWaypoints(e, id) {
        if (!id) id = 'default';
        waypoints[id] = e;
    }

    function stop(id) {
        clearInterval(loop[id]);
    }

    function start(style, attribute, id) {
        if (!id) id = 'default';
        let startColor = waypoints[id][0];
        let defaultColor = startColor.slice();
        let targetColor = waypoints[id][1];
        currentIndex[id] = 1;
        loop[id] = setInterval(() => {
            for (let i = 0; i < defaultColor.length; ++i) {
                if (targetColor[i] > defaultColor[i]) defaultColor[i]++;
                else if (targetColor[i] < defaultColor[i]) defaultColor[i]--;
            }
            if (JSON.stringify(targetColor) === JSON.stringify(defaultColor)) {
                targetColor = waypoints[id][currentIndex[id]++];
                currentIndex[id] = currentIndex[id] % waypoints[id].length;
            }
            style[attribute] = 'rgb(' + defaultColor[0] + ',' + defaultColor[1] + ',' + defaultColor[2] + ')'
        }, frequency[id])
    }

    return {
        start: start,
        setFrequency: setFrequency,
        stop: stop,
        setWaypoints: setWaypoints,
        initialize: initialize,
    }
}

export default colorChanger;