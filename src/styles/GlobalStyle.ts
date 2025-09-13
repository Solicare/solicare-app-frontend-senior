import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    height: 100%;
    width: 100%;
    scroll-behavior: smooth;
  }
  
  body {
    width: 100%;
    height: 100%;
    background: #f7f9fb;
    font-family: 'Noto Sans KR', 'Pretendard', '맑은 고딕', 'Nanum Gothic', 'Roboto', sans-serif;
    color: #222;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0.01em;
    line-height: 1.7;
    zoom: 1;
    transform: scale(1);
    transform-origin: top left;
  }
  
  #root {
    width: 100%;
    min-height: 100vh;
    display: block;
    margin: 0;
    padding: 0;
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
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default GlobalStyle;
