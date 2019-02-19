import styled from 'styled-components';

const Day = styled.div`
display: inline-block;
width: 30px;
height: 30px;
text-align: center;
cursor: pointer;
font-size: 20px;
line-height: 25px;
padding-bottom: 5px;
border-right: 0.5px solid black;
border: ${props=> props.selected ? "1px solid white" : "1px solid black"}
`;

export default Day;