import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import styled from "@emotion/styled";
import { getPosts } from "../apis/post";
import { formatDate } from "../utils/formatDate";
import { theme } from "../styles/theme";

const Page = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
  margin: 16px 0 24px;

  input {
    flex: 1;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid ${theme.colors.primary};
  }

  button {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    background-color: ${theme.colors.primary};
    color: #ffffff;
    transition: background-color 0.2s ease;

    &:disabled {
      background-color: #888;
      cursor: not-allowed;
    }
  }
`;

const CardList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 3주차 MovieCard처럼 카드 전체를 Link로. 클릭하면 상세로 이동
const Card = styled(Link)`
  display: block;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  color: ${theme.colors.text};
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .preview {
    color: #555;
    margin-bottom: 12px;
    // 본문 미리보기는 한 줄만, 넘치면 ...
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    display: flex;
    gap: 12px;
    font-size: 14px;
    color: #777;
  }

  .author {
    color: ${theme.colors.primary};
    font-weight: bold;
  }
`;

 // queryKey: 이 데이터의 이름표. 같은 키면 캐시를 재사용
  // queryFn: 실제로 데이터를 가져오는 함수
//  이름표가 바뀌면 useQuery는 새 데이터라 생각하고 queryfn을 다시 실행한다. 이걸 검색이 이용하는거
// 3주차 minrating, maxrating과 같은 의존성 배열로 재요청하던 역할을 이 친구가 대신하는거

function PostListPage() {
  // inputValue: 타이핑 중인 글자. keyword: 검색 버튼을 눌러 확정된 검색어
  // 둘을 나눠야 글자 칠 때마다 요청이 나가지 않는다 ( inputValue / postId 와 같은 구조)
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, isPending, isError } = useQuery({
    queryKey: ["posts", keyword],
    queryFn: () => getPosts(keyword),
  });

 // form 기본 동작(새로고침) 막기 
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); 
    setKeyword(inputValue);
  };

  return (
    <Page>
      <h1>게시글 목록</h1>

      <SearchForm onSubmit={handleSearch}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="제목 검색"
        />
        {/* Input이 비어있으면 검색 버튼 비활성화 */}
        <button type="submit" disabled={inputValue.trim() === ""}>
          검색
        </button>
      </SearchForm>

      {isPending && <p>불러오는 중...</p>}
      {isError && <p>목록을 불러오지 못했어요.</p>}

      {data && (
        <CardList>
          {data.posts.map((post) => (
            <li key={post.id}>
              <Card to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
                <p className="preview">{post.content}</p>
                <p className="meta">
                  <span className="author">{post.author}</span>
                  <span>{formatDate(post.createdAt)}</span>
                </p>
              </Card>
            </li>
          ))}
        </CardList>
      )}
    </Page>
  );
}

export default PostListPage;
