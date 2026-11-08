import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postAuthorizationCode, type Part } from "../apis/member";

// 3주차 과제 : useEffect 안에서 요청 보내고 loading, error, data usestae 세개를 직접 관리
// 4주차 달라진점 : useMutaion 함수가 이 셋을 다 줌

const PARTS: Part[] = ["WEB", "iOS", "ANDROID"];

function AuthPage() {
  const [part, setPart] = useState<Part>("WEB");

  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: postAuthorizationCode,
    onSuccess: (result) => {
      localStorage.setItem("authorizationCode", result.authorizationCode);
    },
  });

  return (
    <div>
      <h1>회원 코드 발급</h1>
      <select value={part} onChange={(e) => setPart(e.target.value as Part)}>
        {PARTS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button onClick={() => mutate(part)} disabled={isPending}>
        {isPending ? "발급 중..." : "코드 발급"}
      </button>
      {isError && <p>발급에 실패했어요.</p>}
      {data && <p>발급된 코드: {data.authorizationCode}</p>}
    </div>
  );
}

export default AuthPage;
