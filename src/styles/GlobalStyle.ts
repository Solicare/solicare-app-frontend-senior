import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100vw;
    min-height: 100vh;
    background: #f7f9fb;
    font-family: 'Noto Sans KR', 'Pretendard', '맑은 고딕', 'Nanum Gothic', 'Roboto', sans-serif;
    color: #222;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0.01em;
    line-height: 1.7;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  button {
    font-family: inherit;
    cursor: pointer;
    outline: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, textarea {
    font-family: inherit;
    font-size: 1rem;
    outline: none;
  }
`;

export default GlobalStyle;
