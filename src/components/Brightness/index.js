import styled, { css } from 'styled-components';
import Slider, { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';


const Brightness = styled(Slider)`
.rc-slider-rail {
background: red;
}
`;

export default Brightness;