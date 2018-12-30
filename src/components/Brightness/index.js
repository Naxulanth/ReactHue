import styled, { css } from 'styled-components';
import Slider, { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';

const Brightness = styled(Slider)`
margin-bottom: 20px;
min-width: 316px;

.rc-slider-rail {
    background: #464646;
    }

.rc-slider-track {
        background: #636363;
        }

.rc-slider-handle {
    border: 0px;
}
`;

export default Brightness;