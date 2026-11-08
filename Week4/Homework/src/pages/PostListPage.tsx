import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import styled from "@emotion/styled";
import { getPosts } from "../apis/post";
import { theme } from "../styles/theme";

const Page = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
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

  p {
    color: #555;
  }
`;

 // queryKey: 이 데이터의 이름표. 같은 키면 캐시를 재사용
  // queryFn: 실제로 데이터를 가져오는 함수
//  이름표가 바뀌면 useQuery는 새 데이터라 생각하고 queryfn을 다시 실행한다. 이걸 검색이 이용하는거
// 3주차 minrating, maxrating과 같은 의존성 배열로 재요청하던 역할을 이 친구가 대신하는거

function PostListPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isPending) return <Page>불러오는 중...</Page>;
  if (isError) return <Page>목록을 불러오지 못했어요.</Page>;

  return (
    <Page>
      <h1>게시글 목록</h1>
      <CardList>
        {data.posts.map((post) => (
          <li key={post.id}>
            <Card to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.author}</p>
            </Card>
          </li>
        ))}
      </CardList>
    </Page>
  );
}

export default PostListPage;
