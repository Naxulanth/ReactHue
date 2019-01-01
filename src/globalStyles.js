import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

  body {
    background-color: #000000 !important;
    color: #f7f7f7 !important;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-style: normal;
    overflow-x: hidden;
    font-size: 1rem !important;
    -webkit-font-smoothing: antialiased;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #root {
    min-height: 100%;
    position: relative;
  }

  .pad {
    padding-bottom: 50px;
  }
  
`

export default GlobalStyle;