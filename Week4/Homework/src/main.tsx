import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import App from "./App.tsx";

// 쿼리관리자. 컨포넌트 바깥에서 한번만 감싸줌
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
