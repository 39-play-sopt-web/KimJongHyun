import { Global, css } from "@emotion/react";
import { theme } from "./theme";

//GlobalStyle 컴포넌트
export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
        }
      `}
    />
  );
}