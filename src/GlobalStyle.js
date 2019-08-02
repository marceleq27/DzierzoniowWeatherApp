import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,700&display=swap&subset=latin-ext');
@import url('https://fonts.googleapis.com/css?family=Crimson+Pro:400,700&display=swap&subset=latin-ext');
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:'Rubik',sans-serif;
  }
  body{
    height:100vh;
    overflow:hidden;
  }
`;

export default GlobalStyle;
