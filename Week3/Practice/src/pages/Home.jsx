// Home.jsx

import { Link } from "react-router";

const Home = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>홈</h1>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
       
        <Link to='/member/김민아'>웹팟장김민아</Link>
        <Link to='/member/이해니'>미팀장이해니</Link>
        <Link to='/member/박우찬'>부회장박우찬</Link>
      </div>
    </div>
  );
};

export default Home;
