import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import styled from "@emotion/styled";
import { getPost, updatePost } from "../apis/post";
import { theme } from "../styles/theme";

const Page = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
`;

const Article = styled.article`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .meta {
    color: #777;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .content {
    white-space: pre-wrap;
    line-height: 1.6;
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

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

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;

  button {
    padding: 10px 16px;
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
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 8px;
  color: ${theme.colors.primary};
`;

function PostDetailPage() {
  // 주소의 :postId 자리 값. 주소에서 오는 값은 항상 문자열이라 Number로 변환
  const { postId } = useParams();
  const id = Number(postId);

  const queryClient = useQueryClient();

  // 수정 모드 여부와, 수정 중인 입력값
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 목록은 ["posts"], 상세는 ["post", id]. 글마다 다른 이름표
  const { data: post, isPending, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: (body: { title: string; content: string }) =>
      updatePost(id, body),
    onSuccess: () => {
      // 상세와 목록 둘 다 갱신. 제목이 바뀌면 목록 카드도 바뀌어야 하니까
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("수정되었습니다.");
      setIsEditing(false);
    },
    onError: () => {
      alert("수정에 실패했습니다.");
    },
  });

  // 수정 버튼 클릭 시 기존 제목·본문을 Input에 채움
  const startEdit = () => {
    if (!post) return;
    setTitle(post.title);
    setContent(post.content);
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, content });
  };

  if (isPending) return <Page>불러오는 중...</Page>;
  if (isError) return <Page>게시글을 불러오지 못했어요.</Page>;

  return (
    <Page>
      <BackLink to="/posts">← 목록으로</BackLink>

      <Article>
        {isEditing ? (
          <EditForm onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <ButtonRow>
              <button type="submit" disabled={isUpdating}>
                {isUpdating ? "저장 중..." : "저장"}
              </button>
              <button type="button" onClick={() => setIsEditing(false)}>
                취소
              </button>
            </ButtonRow>
          </EditForm>
        ) : (
          <>
            <h1>{post.title}</h1>
            <p className="meta">
              {post.author} · {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="content">{post.content}</p>
            <ButtonRow>
              <button onClick={startEdit}>수정</button>
            </ButtonRow>
          </>
        )}
      </Article>
    </Page>
  );
}

export default PostDetailPage;
