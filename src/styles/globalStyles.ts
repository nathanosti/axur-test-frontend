import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html, body, #root {
      width: 100%;
      height: 100%;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: ${(props) => props.theme.colors.background.primary};
    }
`;
