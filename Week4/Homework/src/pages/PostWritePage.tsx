import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import styled from "@emotion/styled";
import { createPost } from "../apis/post";
import { theme } from "../styles/theme";

// API 문서 기준 글자 수 제한
const MAX = { title: 50, content: 1000, author: 20 };

const Page = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`;

const StepLabel = styled.p`
  margin-top: 8px;
  color: #555;
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

const Hint = styled.p<{ error?: boolean }>`
  font-size: 14px;
  text-align: right;
  color: ${({ error }) => (error ? "#d33" : "#777")};
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
  // 심화과제: 1 제목 → 2 본문 → 3 작성자. URL은 그대로, state만 바뀜
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  // main.tsx에서 만든 queryClient를 꺼내온다. 캐시에 명령을 내릴 때 필요
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (post) => {
      // ["posts"]로 시작하는 모든 캐시(검색 결과 포함)를 낡은 것으로 표시
      //  목록 페이지가 뜨면 useQuery가 자동으로 다시 요청한다

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert(`${post.author}님의 게시글이 작성되었습니다.`); // 심화: alert에 작성자 출력
      navigate("/posts");
    },
    onError: () => {
      alert("게시글 작성에 실패했습니다.");
    },
  });

  // 현재 단계의 값과 제한. 단계마다 if문 안 쓰려고 한 곳에 모아둠
  const current = {
    1: { value: title, max: MAX.title },
    2: { value: content, max: MAX.content },
    3: { value: author, max: MAX.author },
  }[step];

  const isEmpty = current.value.trim() === "";
  const isTooLong = current.value.length > current.max;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else mutate({ title, content, author });
  };

  return (
    <Page>
      <h1>게시글 작성</h1>
      <StepLabel>{step} / 3 단계</StepLabel>

      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        )}
        {step === 2 && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="본문"
          />
        )}
        {step === 3 && (
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자"
          />
        )}

        {/* 심화과제: 글자 수 카운터 + 초과 시 에러 메시지 */}
        <Hint error={isTooLong}>
          {isTooLong
            ? `${current.max}자를 초과했습니다.`
            : `${current.value.length} / ${current.max}`}
        </Hint>

        <SubmitButton type="submit" disabled={isEmpty || isTooLong || isPending}>
          {step < 3 ? "다음" : isPending ? "작성 중..." : "작성"}
        </SubmitButton>
      </Form>

      <ListLink to="/posts">목록으로</ListLink>
    </Page>
  );
}

export default PostWritePage;
