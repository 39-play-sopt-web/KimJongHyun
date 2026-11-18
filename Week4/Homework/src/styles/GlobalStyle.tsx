import { Global, css } from "@emotion/react";
import { theme } from "./theme";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Pretendard", system-ui, -apple-system, sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.5;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: 15px;
    color: ${theme.colors.text};
    background-color: ${theme.colors.surface};
  }

  input::placeholder,
  textarea::placeholder {
    color: ${theme.colors.textMuted};
  }

  a {
    color: inherit;
  }

  button {
    cursor: pointer;
  }
`;

function GlobalStyle() {
  return <Global styles={globalStyles} />;
}

export default GlobalStyle;