// ** Styled Components Imports
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        light: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        light: string;
      };
      statusCode: {
        done: string;
        active: string;
        unknown: string;
      };
    };
  }
}
