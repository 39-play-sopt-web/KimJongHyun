// 수정 기능까지 넣어보기
// title / content 중 원하는 값만 입력하기
// (PUT은 title, content 둘 다 필수라서 비워둔 값은 기존 값으로 채워서 보내요!)

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const POST_ID = 73;

type UpdatePostPayload = {
  title: string;
  content: string;
};

const getPostDetail = async (id: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/${id}`,
  );
  return response.data.data;
};

const updatePost = async ({
  id,
  payload,
}: {
  id: number;
  payload: UpdatePostPayload;
}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/posts/${id}`,
    payload,
    {
      headers: {
        Authorization: import.meta.env.VITE_AUTH_CODE, // 접두사(Bearer) 없이 그대로!
      },
    },
  );
  return response.data.data;
};

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", POST_ID],
    queryFn: () => getPostDetail(POST_ID),
  });

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: (payload: UpdatePostPayload) =>
      updatePost({ id: POST_ID, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", POST_ID] });

      setTitle("");
      setContent("");
    },
  });

  const buildPayload = (): UpdatePostPayload => {
    // 입력하지 않은 값은 기존 게시글 값으로 채우기
    return {
      title: title.trim() || data.title,
      content: content.trim() || data.content,
    };
  };

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러: {error.message}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <h1>내 게시글</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data && (
          <>
            <p>title: {data.title}</p>
            <p>content: {data.content}</p>
            <p>author: {data.author}</p>
            <p>updatedAt: {data.updatedAt}</p>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="새 제목"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="새 본문"
        />
        <button onClick={() => mutate(buildPayload())} disabled={isMutating}>
          {isMutating ? "수정 중..." : "게시글 수정"}
        </button>
      </div>
    </div>
  );
}

export default App;