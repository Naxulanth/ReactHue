import styled from 'styled-components';

import { HuePicker } from 'react-color'

import 'rc-slider/assets/style.css';


const ColorPicker = styled(HuePicker)`
width: auto !important;

.hue-horizontal {
border-radius: 50px !important;
width: auto !important;
}
`;

export default ColorPicker;