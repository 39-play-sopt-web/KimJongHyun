import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "./styles/GlobalStyle";



// ThemeProvider 연결
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";

// import "./index.css"; 기존 css 주석처리
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
