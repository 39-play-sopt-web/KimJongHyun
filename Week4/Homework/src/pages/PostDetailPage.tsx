import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router";
import styled from "@emotion/styled";
import { getPost, updatePost, deletePost } from "../apis/post";
import { theme } from "../styles/theme";
import { formatDate } from "../utils/formatDate";

const Page = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
`;

const Article = styled.article`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .meta {
    color: ${theme.colors.textMuted};
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
    border-radius: 8px;
    border: 1px solid ${theme.colors.border};
    outline: none;
    &:focus { border-color: ${theme.colors.primary}; }
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
    border-radius: 8px;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.onPrimary};
    font-weight: 600;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${theme.colors.primaryHover};
    }

    &:disabled {
      background-color: ${theme.colors.disabled};
    color: ${theme.colors.textMuted};
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
  const navigate = useNavigate();

  // 수정 모드 여부와, 수정 중인 입력값
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 목록은 ["posts"], 상세는 ["post", id]. 글마다 다른 이름표
  const { data: post, isPending, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      // 삭제된 글은 목록에서도 빠져야 하니 목록 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("삭제되었습니다.");
      navigate("/posts");
    },
    onError: () => {
      alert("삭제에 실패했습니다.");
    },
  });

  const handleDelete = () => {
    if (!ensureAuth()) return;
    if (confirm("정말 삭제할까요?")) remove();
  };

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
  // 라우트 가드 추가: 수정·삭제 전에 코드 확인. 없으면 alert 후 발급 페이지로
  const ensureAuth = () => {
    if (localStorage.getItem("authorizationCode")) return true;
    alert("회원 코드 발급이 필요합니다.");
    navigate("/");
    return false;
  };

  const startEdit = () => {
    if (!ensureAuth() || !post) return;
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
              {post.author} · {formatDate(post.createdAt)}
            </p>
            <p className="content">{post.content}</p>
            <ButtonRow>
              <button onClick={startEdit}>수정</button>
              <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </ButtonRow>
          </>
        )}
      </Article>
    </Page>
  );
}

export default PostDetailPage;
