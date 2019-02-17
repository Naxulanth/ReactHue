import styled from 'styled-components';

import { Button } from 'reactstrap';

const ButtonComponent = styled(Button)`
width: ${props => props.width ? '60%;' : '35%;'}
margin-bottom: ${props => props.width ? '0px;' : '20px;'}
background: green !important;
border-radius: 20px !important;
border: 0px !important;
color: white !important;
`;

export default ButtonComponent;