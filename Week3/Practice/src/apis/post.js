// src/apis/post.js
import apiClient from "./apiClient";

// 게시글 목록 조회 (GET /api/v1/posts)
export const getPosts = async ({ keyword, cursor, size } = {}) => {
  const res = await apiClient.get("/posts", {
    params: { keyword, cursor, size },
  });
  return res.data.data; // { posts, nextCursor, hasNext }
};


// src/apis/post.js 에 추가
export const getPostById = async (postId) => {
  const res = await apiClient.get(`/posts/${postId}`);
  return res.data.data;
};