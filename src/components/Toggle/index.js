import styled, { css } from 'styled-components';

import ReactToggle from 'react-toggle';
import "react-toggle/style.css"

const Toggle = styled(ReactToggle)`
display:inline-block;
float:right;

.react-toggle-track {
    background: #464646 !important;
}

.react-toggle-thumb {

}

.react-toggle-track-x {
    display: none;
}

.react-toggle-track-check {
    display: none;
}
`;

export default Toggle;