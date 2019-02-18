import styled from 'styled-components';

const Day = styled.div`
display: inline-block;
width: 30px;
height: 30px;
text-align: center;
cursor: pointer;
font-size: 20px;
line-height: 30px;
border-right: 0.5px solid black;
background: ${props=> props.selected ? "green" : "transparent"}
`;

export default Day;