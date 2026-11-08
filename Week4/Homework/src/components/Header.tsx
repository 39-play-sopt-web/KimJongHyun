import { Link, useNavigate } from "react-router";

// localStorage 개념 : usestate는 새로고침하면 초기화됨. localStorage는 브라우저 껐다 켜도 남음.
// props로 넘길필요없이 authpage에서 저장한 파트를 헤더가 읽을 수 있음

function Header() {
  const navigate = useNavigate();
  const part = localStorage.getItem("part");

  const handleLogout = () => {
    localStorage.removeItem("authorizationCode");
    localStorage.removeItem("part");
    navigate("/");
  };

  return (
    <header>
      <span>{part}</span>
      <nav>
        <Link to="/posts">게시글 목록</Link>
        <Link to="/posts/new">글쓰기</Link>
        <button onClick={handleLogout}>로그아웃</button>
      </nav>
    </header>
  );
}

export default Header;
