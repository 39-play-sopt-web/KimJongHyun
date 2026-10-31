// 2. QueryClientProvider 세팅 (main.tsx)
// 쿼리 클라이언트를 전역으로 감싸요!

	import ReactDOM from "react-dom/client";
	import App from "./App.tsx";
	import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
	
	const queryClient = new QueryClient();
	
	ReactDOM.createRoot(document.getElementById("root")!).render(
	  <QueryClientProvider client={queryClient}>
	    <App />
	  </QueryClientProvider>,
	);
