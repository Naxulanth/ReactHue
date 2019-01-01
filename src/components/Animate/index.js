import posed from 'react-pose'

const Animate = posed.div({
    visible: { opacity: 1, height: 'initial' },
    hidden: { opacity: 0, height: 0 },
    transition: {
        opacity: { ease: 'linear', duration: 500 },
    }
});

export default Animate;