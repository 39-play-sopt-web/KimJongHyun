import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import styled from "@emotion/styled";
import { postAuthorizationCode, type Part } from "../apis/member";
import { theme } from "../styles/theme";

// 3주차 과제 : useEffect 안에서 요청 보내고 loading, error, data usestae 세개를 직접 관리
// 4주차 달라진점 : useMutaion 함수가 이 셋을 다 줌

const PARTS: Part[] = ["WEB", "iOS", "ANDROID"];

const Page = styled.main`
  max-width: 400px;
  margin: 80px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.primary};
`;

// hover 시 배경색 변경 + transition
const IssueButton = styled.button`
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
  text-align: center;
  color: ${theme.colors.primary};
`;

function AuthPage() {
  const [part, setPart] = useState<Part>("WEB");
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: postAuthorizationCode,
    onSuccess: (result) => {
      localStorage.setItem("authorizationCode", result.authorizationCode);
      localStorage.setItem("part", part);
      navigate("/posts"); 
    },
  });

  return (
    <Page>
      <h1>회원 코드 발급</h1>
      <Select value={part} onChange={(e) => setPart(e.target.value as Part)}>
        {PARTS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </Select>
      <IssueButton onClick={() => mutate(part)} disabled={isPending}>
        {isPending ? "발급 중..." : "코드 발급"}
      </IssueButton>
      {isError && <p>발급에 실패했어요.</p>}
      <ListLink to="/posts">게시글 목록으로</ListLink>
    </Page>
  );
}

export default AuthPage;
