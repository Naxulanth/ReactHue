import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

  body {
    background-color: #000000 !important;
    color: #f7f7f7 !important;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }
`

export default GlobalStyle;