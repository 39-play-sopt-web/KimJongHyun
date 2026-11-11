import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
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
    border-radius: 8px;
    border: 1px solid ${theme.colors.border};
    outline: none;
    &:focus { border-color: ${theme.colors.primary}; }
  }

  button {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.onPrimary};
    font-weight: 600;
    transition: background-color 0.2s ease;

    &:disabled {
      background-color: ${theme.colors.disabled};
    color: ${theme.colors.textMuted};
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
  border-radius: ${theme.radius};
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text};
  text-decoration: none;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: ${theme.colors.surfaceHover};
    border-color: ${theme.colors.primary};
  }

  h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .preview {
    color: ${theme.colors.textMuted};
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
    color: ${theme.colors.textMuted};
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

  // 심화과제: 무한스크롤. useQuery → useInfiniteQuery
  // 3주차엔 page state + 응답 이어붙이기 + hasMore를 직접 관리했는데, 여기선 라이브러리가 대신함
  // 커서가 뭐냐 글이 100개 있다고 하면 2페이지 주세요가 아닌 id 83부터 주세요 라고 요청함. 이 83이 바로 커서다. 이 id를 기억했다가 다음 요청에 붙이는거
  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", keyword],
      // pageParam = 이번 페이지를 요청할 때 쓸 cursor. 첫 페이지는 initialPageParam
      queryFn: ({ pageParam }) => getPosts(keyword, pageParam),
      initialPageParam: undefined as number | undefined,
      // 방금 받은 페이지를 보고 다음 cursor를 정한다. 더 돌려줄 페이지가 없으면? undefined
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
    });

  // 3주차 loadMoreRef와 같은 역할. 목록 맨 아래 감시용 div
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: 감시 div가 화면에 보이면 다음 페이지 요청
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      // 이미 가져오는 중이면 중복 요청 방지 (3주차 리뷰받었던 부분이고)
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
          {/* data.pages = 페이지 배열. flatMap으로 글 하나의 배열로 펼침 */}
          {data.pages.flatMap((page) => page.posts).map((post) => (
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

      {isFetchingNextPage && <p>더 불러오는 중...</p>}
      {/* 감시 대상. 이게 화면에 들어오면 다음 페이지 */}
      <div ref={loadMoreRef} style={{ height: "1px" }} />
    </Page>
  );
}

export default PostListPage;
