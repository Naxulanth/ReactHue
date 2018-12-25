import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const MenuBarLink = styled(Link)`
margin-right: 20px;
color: white;
&:hover { 
    text-decoration: none;
    color: gray;
}
`;

export default MenuBarLink;