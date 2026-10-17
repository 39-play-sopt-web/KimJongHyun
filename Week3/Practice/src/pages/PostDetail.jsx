// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getPostById } from "../apis/post";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostById(postId);
        setPost(data);
      } catch (error) {
        console.error("상세 정보를 불러오는 데 실패했습니다.", error);
      }
    };
    fetchData();
  }, [postId]);

  if (!post) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/">← 목록으로 돌아가기</Link>
      <h1>{post.title}</h1>
      <p style={{ color: "#999" }}>by {post.author}</p>
      <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
    </div>
  );
};

export default PostDetail;