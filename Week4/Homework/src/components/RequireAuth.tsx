import { useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router";

// 라우트 가드: 라우트(route)주소 앞을 지키는 경비다. 문지기지
// 인증 코드가 없으면 alert 후 발급 페이지로 돌려보낸다
// children = 이 컴포넌트로 감싼 페이지 (코드가 있을 때만 그려짐)
function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const hasCode = Boolean(localStorage.getItem("authorizationCode"));

  // StrictMode(개발 모드)는 effect를 두 번 실행해서 alert가 두 번 뜬다
  // ref에 "이미 안내했음"을 적어두고 한 번만 실행 (4주차 리뷰 반영)
  const alerted = useRef(false);

  // alert, navigate 같은 부수효과는 렌더 중이 아니라 useEffect에서 관리하자
  useEffect(() => {
    if (!hasCode && !alerted.current) {
      alerted.current = true;
      alert("회원 코드 발급이 필요합니다.");
      navigate("/", { replace: true });
    }
  }, [hasCode, navigate]);

  if (!hasCode) return null;
  return children;
}

export default RequireAuth;
