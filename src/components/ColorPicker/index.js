import styled, { css } from 'styled-components';
import { HuePicker } from 'react-color'

import 'rc-slider/assets/index.css';


const ColorPicker = styled(HuePicker)`
.hue-horizontal {
border-radius: 50px !important;
}
`;

export default ColorPicker;