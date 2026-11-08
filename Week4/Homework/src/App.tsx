import { Routes, Route } from "react-router";
import AuthPage from "./pages/AuthPage";
import PostListPage from "./pages/PostListPage";
import PostWritePage from "./pages/PostWritePage";
import PostDetailPage from "./pages/PostDetailPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route element={<Layout />}>
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/new" element={<PostWritePage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
