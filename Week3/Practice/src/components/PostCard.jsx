// src/components/PostCard.jsx
import { Link } from "react-router";

const PostCard = ({ post }) => {
  const { id, title, content, author } = post;
  return (
    <Link
      to={`/posts/${id}`}
      style={{
        display: "block",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textDecoration: "none",
        color: "#333",
        width: "220px",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>{content}</p>
      <span style={{ fontSize: "0.8rem", color: "#999" }}>by {author}</span>
    </Link>
  );
};

export default PostCard;