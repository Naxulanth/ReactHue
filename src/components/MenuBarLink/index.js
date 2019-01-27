import styled from 'styled-components';

import { Link } from 'react-router-dom';

const MenuBarLink = styled(Link)`
color: white;
&:hover { 
    text-decoration: none;
    color: gray;
}
`;

export default MenuBarLink;