// src/pages/MemberCode.jsx
import { useState } from "react";
import { issueAuthorizationCode } from "../apis/member";

const MemberCode = () => {
  const [part, setPart] = useState("WEB");
  const [code, setCode] = useState("");

  const handleIssue = async () => {
    try {
      const authorizationCode = await issueAuthorizationCode(part);
      setCode(authorizationCode);
    } catch (error) {
      console.error("회원 코드 발급에 실패했습니다.", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>회원 코드 발급</h1>
      <select value={part} onChange={(e) => setPart(e.target.value)}>
        <option value="WEB">WEB</option>
        <option value="iOS">iOS</option>
        <option value="ANDROID">ANDROID</option>
      </select>
      <button type="button" onClick={handleIssue}>코드 발급받기</button>
      {code && <p>발급된 코드: {code}</p>}
    </div>
  );
};

export default MemberCode;