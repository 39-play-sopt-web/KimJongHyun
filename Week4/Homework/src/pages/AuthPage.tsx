import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
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

const ListButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  text-decoration: underline;
  text-align: center;
  color: ${theme.colors.primary};
`;

function AuthPage() {
  // 심화과제: 미선택 상태("")를 표현하기 위해 Part 또는 빈 문자열
  const [part, setPart] = useState<Part | "">("");
  const navigate = useNavigate();

  const goToList = () => {
    if (!localStorage.getItem("authorizationCode")) {
      alert("먼저 파트를 선택하고 코드를 발급받아 주세요.");
      return;
    }
    navigate("/posts");
  };

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
        <option value="">파트를 선택하세요</option>
        {PARTS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </Select>
      {/* 파트 미선택 시 버튼 비활성화 */}
      <IssueButton
        onClick={() => part && mutate(part)}
        disabled={!part || isPending}
      >
        {isPending ? "발급 중..." : "코드 발급"}
      </IssueButton>
      {isError && <p>발급에 실패했어요.</p>}
      {/* 참고 구현과 동일하게 코드 없으면 목록도 막고 안내 */}
      <ListButton type="button" onClick={goToList}>
        게시글 목록으로
      </ListButton>
    </Page>
  );
}

export default AuthPage;
