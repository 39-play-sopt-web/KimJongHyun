import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import styled from "@emotion/styled";
import { createPost } from "../apis/post";
import { theme } from "../styles/theme";

const Page = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;

  input,
  textarea {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid ${theme.colors.primary};
    font-family: inherit;
  }

  textarea {
    min-height: 200px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: ${theme.colors.primary};
  color: #ffffff;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2b2a8f;
  }

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;

const ListLink = styled(Link)`
  display: block;
  margin-top: 16px;
  text-align: center;
  color: ${theme.colors.primary};
`;

function PostWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  // main.tsx에서 만든 queryClient를 꺼내온다. 캐시에 명령을 내릴 때 필요
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // ["posts"]로 시작하는 모든 캐시(검색 결과 포함)를 낡은 것으로 표시
      //  목록 페이지가 뜨면 useQuery가 자동으로 다시 요청한다

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("게시글이 작성되었습니다."); 
      navigate("/posts");
    },
    onError: () => {
      alert("게시글 작성에 실패했습니다."); 
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, content, author });
  };

  return (
    <Page>
      <h1>게시글 작성</h1>
      <Form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="본문"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="작성자"
        />
        <SubmitButton type="submit" disabled={isPending}>
          {isPending ? "작성 중..." : "작성"}
        </SubmitButton>
      </Form>
      <ListLink to="/posts">목록으로</ListLink>
    </Page>
  );
}

export default PostWritePage;
