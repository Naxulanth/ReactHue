import { createGlobalStyle } from "styled-components";

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

  .center {
    text-align: center;
  }

  .vertical-center {
    align-items: center;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
}

.child {
    height: 100%;
    margin-right: -50px;
    /* maximum width of scrollbar */
    padding-right: 35px;
    /* maximum width of scrollbar */
    overflow-x: hidden;
    overflow-y: scroll;
}

.last {
  margin-bottom: 15px !important;
}

input {
  background: black;
  color: white;
  border-radius: 3px;
  border: 1px solid white;
  padding: 5px;
}
  
`;

export default GlobalStyle;
