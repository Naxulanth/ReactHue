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
border: 1px solid ${props=> props.selected ? "white" : "black"}
`;

export default Day;