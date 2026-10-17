// src/router/Router.jsx
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import PostDetail from "../pages/PostDetail";
import MemberCode from "../pages/MemberCode";

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/posts/:postId", Component: PostDetail },
  { path: "/member", Component: MemberCode },
]);

export default router;