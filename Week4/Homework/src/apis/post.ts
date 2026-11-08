import { apiClient } from "./apiClient";
import type { ApiResponse } from "./types";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

// 목록 응답은 글 배열 + 다음 페이지 정보(무한스크롤용) 같이 옴,
// 게시글 단위에 무한 스크롤이 필요한가, 오히려 1,2,3페이지 느낌으로 하는게 좋지 않나. 모르겠다
// 라고 생각했지만 API가 페이지 번호 방식을 지원하지 않는다고 하네요! 영화 과제랑 비슷한 느낌.
interface PostListData {
  posts: Post[];
  nextCursor: number;
  hasNext: boolean;
}

export const getPosts = async (keyword: string) => {
  const response = await apiClient.get<ApiResponse<PostListData>>("/posts", {
    params: { keyword },
  });
  return response.data.data;
};


export interface CreatePostRequest {
  title: string;
  content: string;
  author: string;
}

export const createPost = async (body: CreatePostRequest) => {
  const response = await apiClient.post<ApiResponse<Post>>("/posts", body, {
    headers: {
      Authorization: localStorage.getItem("authorizationCode"),
    },
  });
  return response.data.data;
};
