import posed from 'react-pose'
import { tween } from 'popmotion';

const Animate = posed.div({
    visible: { opacity: 1, height: 'initial', transition: props => tween({ ...props, duration: 500 }) },
    hidden: { opacity: 0, height: 0, transition: props => tween({ ...props, duration: 500 }) },
});

export default Animate;