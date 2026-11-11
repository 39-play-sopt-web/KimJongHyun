import { Routes, Route } from "react-router";
import AuthPage from "./pages/AuthPage";
import PostListPage from "./pages/PostListPage";
import PostWritePage from "./pages/PostWritePage";
import PostDetailPage from "./pages/PostDetailPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route element={<Layout />}>
        <Route path="/posts" element={<PostListPage />} />
        {/* 심화: 코드 없으면 글쓰기 진입 차단 */}
        <Route
          path="/posts/new"
          element={
            <RequireAuth>
              <PostWritePage />
            </RequireAuth>
          }
        />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
