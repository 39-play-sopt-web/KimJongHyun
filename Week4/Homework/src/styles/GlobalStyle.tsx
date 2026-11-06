import { Global, css } from "@emotion/react";
import { theme } from "./theme";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: system-ui, sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }

  button {
    cursor: pointer;
  }
`;

function GlobalStyle() {
  return <Global styles={globalStyles} />;
}

export default GlobalStyle;