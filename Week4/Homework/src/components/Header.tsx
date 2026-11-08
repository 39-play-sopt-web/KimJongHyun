import { NavLink, useNavigate } from "react-router";
import styled from "@emotion/styled";
import { theme } from "../styles/theme";

// localStorage 개념 : usestate는 새로고침하면 초기화됨. localStorage는 브라우저 껐다 켜도 남음.
// props로 넘길필요없이 authpage에서 저장한 파트를 헤더가 읽을 수 있음

const Bar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
  color: ${theme.colors.text};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const PartLabel = styled.span`
  font-weight: 700;
  color: ${theme.colors.primary};
  letter-spacing: 0.04em;
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;

  a,
  button {
    color: ${theme.colors.textMuted};
    text-decoration: none;
    background: none;
    border: none;
    font-size: 15px;
    transition: color 0.2s ease;
  }

  a:hover,
  button:hover {
    color: ${theme.colors.text};
  }

  /* NavLink가 현재 주소와 일치하면 active 클래스를 붙여 줌 */
  a.active {
    color: ${theme.colors.primary};
    font-weight: 700;
  }
`;

function Header() {
  const navigate = useNavigate();
  const part = localStorage.getItem("part");

//   로그아웃 : 권한코드 삭제 한뒤 다시 발급페이지로 이동
  const handleLogout = () => {
    localStorage.removeItem("authorizationCode");
    localStorage.removeItem("part");
    navigate("/");
  };

  return (
    <Bar>
      <PartLabel>{part}&apos;S TORY</PartLabel>
      <Nav>
        <NavLink to="/posts" end>게시글 목록</NavLink>
        <NavLink to="/posts/new">글쓰기</NavLink>
        <button onClick={handleLogout}>로그아웃</button>
      </Nav>
    </Bar>
  );
}

export default Header;
