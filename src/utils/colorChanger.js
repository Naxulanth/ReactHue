function colorChanger() {
    let waypoints = [[255, 0, 255], [0, 191, 255]];
    let startColor = waypoints[0];
    let defaultColor = startColor.slice();
    let targetColor = waypoints[1];
    let currentIndex = 1;
    let interv = 10;
    let loop = null;

    function setInterv(e) {
        interv = e;
    }

    function setWaypoints(e) {
        waypoints = e;
    }

    function stop() {
        clearInterval(loop);
    }

    function start(style, attribute) {
        loop = setInterval(() => {
            for (let i = 0; i < defaultColor.length; ++i) {
                if (targetColor[i] > defaultColor[i]) defaultColor[i]++;
                else if (targetColor[i] < defaultColor[i]) defaultColor[i]--;
            }
            if (JSON.stringify(targetColor) == JSON.stringify(defaultColor)) {
                targetColor = waypoints[currentIndex++];
                currentIndex = currentIndex % waypoints.length;
            }
            style[attribute] = 'rgb(' + defaultColor[0] + ',' + defaultColor[1] + ',' + defaultColor[2] + ')'
        }, interv)
    }

    return {
        start: start,
        setInterv: setInterv,
        stop: stop,
        setWaypoints: setWaypoints
    }
}

export default colorChanger;