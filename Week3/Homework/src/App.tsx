//다시 정리
//usestate: 화면에서 쓸 데이터를 상태로 관리
//useeffect: 영화 과제에서는 평점이 바뀔때마다 api 재요청
//의존성 배열 []: 처음 마운트 될때, [~,~]: 해당 ~이벤트가 있을때

import { useEffect, useState, useRef } from "react";
import { getMovies, type Movie } from "./apis/movie";
import "./App.css";
import styled from "@emotion/styled";
import { theme } from "./styles/theme";

// 라우터 import
import { Routes, Route, Link } from "react-router";
import MovieDetail from "./pages/MovieDetail";

// emotion으로 CSS변경 진짜 모르겠다 CSS세상은. 다음 딥다이브주제다
const MoviePage = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
  box-sizing: border-box;
  color: ${theme.colors.text};
`;

// 헤더 만들기
const PageHeader = styled.header`
  width: 100%;
  padding: 16px 24px;
  box-sizing: border-box;
  background-color: #202638;
  border-bottom: 1px solid #333;

  /* 헤더 스크롤 상관없이 상단 고정 */
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${theme.colors.background};

  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }

  h1 a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  /* 찾았따 span 부분은 primary 색으로 설정하는거*/
  span {
    color: ${theme.colors.primary};
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// 영화 카드 hover 효과
// 기존 영화 카드 > 클릭하면 주소 이동가능한 영화 카드(link)
const MovieCard = styled(Link)`
  display: block;
  min-width: 0;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  border-radius: 14px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  img {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 12px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease,
      outline-color 0.2s ease;
    outline: 2px solid transparent;
    outline-offset: 3px;
  }

  h2 {
    transition: color 0.2s ease;
  }

  .overview {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #d0d0d0;
    transition: color 0.2s ease;
  }

  &:hover {
    transform: translateY(-8px);
  }

  &:hover img {
    outline-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35);
    filter: brightness(1.08);
  }

  &:hover h2 {
    color: ${theme.colors.primary};
  }

  &:hover .overview {
    color: #ffffff;
  }
`;

// 포스터와 평점 배지를 묶는 영역
const PosterBox = styled.div`
  position: relative;
`;

// 포스터 오른쪽 위에 표시할 평점
const RatingBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
`;

const RatingFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
`;

const FilterButton = styled.button`
  padding: 12px 20px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: #333;
  color: white;
  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  /* 마우스를 올렸을 때 */
  &:hover {
    background-color: #444;
    border-color: #777;
  }

  /* 현재 선택된 필터 */
  &[aria-pressed="true"] {
    background-color: #502727;
    border-color: ${theme.colors.primary};
    font-weight: 600;
  }

  /* 선택된 상태에서 마우스를 올려도 유지 */
  &[aria-pressed="true"]:hover {
    background-color: #502727;
  }

  /* 키보드로 선택할 때 */
  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

// 요청 실패 안내 + 다시 시도 버튼
const ErrorMessage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
  color: #aaa;

  button {
    padding: 6px 12px;
    border: 1px solid #555;
    border-radius: 8px;
    background: none;
    color: inherit;
    cursor: pointer;
  }
`;

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [minRating, setMinRating] = useState<number>();
  const [maxRating, setMaxRating] = useState<number>();

  // 무한 스크롤 구현하기 위한 usestate 추가
  // 단순 page만 있어도 구현은 되는데 반복 요청, 불필요한 요청없이 안정적으로 작동하도록 도와줌
  const [page, setPage] = useState(1);
  // 리뷰 반영: 마지막 페이지 도착 여부. false면 observer를 더 이상 연결하지 않음
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // 리뷰 반영: 요청 실패 여부. 첫 페이지 실패(전체 에러)와 다음 페이지 실패(하단 에러)를 구분
  const [isError, setIsError] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 평점 필터 변경 시 영화 목록과 페이지 초기화
  const changeRating = (min?: number, max?: number) => {
    // 이미 선택된 필터라면 다시 요청하지 않음
    if (minRating === min && maxRating === max) return;
    setMinRating(min);
    setMaxRating(max);
    setPage(1);
    setMovies([]);
    // 필터가 바뀌면 다시 처음부터 조회할 수 있어야 하니 초기화
    setHasMore(true);
    setIsError(false);
  };

  useEffect(() => {
    // 리뷰 반영: 상세 페이지와 같은 cancelled 플래그
    // 필터를 빠르게 바꾸면 이전 요청의 응답이 늦게 도착해 새 목록을 덮어쓸 수 있어서,
    // cleanup에서 cancelled = true로 만들고 응답이 와도 무시한다
    let cancelled = false;

    const fetchMovies = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await getMovies(minRating, maxRating, page);

        if (cancelled) return;

        // 정보 없는것에 대한 에외처리 확인해보는 개발자 콘솔 코드

        const noOverview = data.results.filter(
          (movie) => !movie.overview.trim(),
        );

        console.table(
          noOverview.map((movie) => ({
            id: movie.id,
            title: movie.title,
          })),
        );

        setMovies((prev) => {
          if (page === 1) return data.results;

          // 리뷰 반영: 인기순은 순위가 계속 바뀌어서 다음 페이지에 같은 영화가 또 올 수 있음
          // 이미 가진 id를 모아두고 새로 받은 것만 이어 붙여 중복 카드/key 경고 방지
          const existingIds = new Set(prev.map((movie) => movie.id));
          const newMovies = data.results.filter(
            (movie) => !existingIds.has(movie.id),
          );
          return [...prev, ...newMovies];
        });

        // 리뷰 반영: TMDB는 total_pages와 별개로 최대 500페이지까지만 요청 가능
        setHasMore(data.page < Math.min(data.total_pages, 500));
      } catch {
        // 리뷰 반영: 실패하면 에러 상태만 켜고 page는 그대로 둠 (observer가 더 증가시키지 않음)
        if (!cancelled) setIsError(true);
      } finally {
        // 이전 요청이 새 요청의 로딩 상태를 먼저 끄는 것도 막아야 함
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [minRating, maxRating, page]);

  //제일 중요한거 무한 스크롤
  // intersectionobserver: 감시하는 객체
  // 페이지 밑에 도착했어? > 다음페이지로 변경(이어붙여)
  useEffect(() => {
    // 리뷰 반영: 마지막 페이지이거나 요청이 실패한 상태면 observer를 연결하지 않음
    if (movies.length === 0 || isLoading || !hasMore || isError) return;

    const target = loadMoreRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [movies, isLoading, hasMore, isError]);

  return (
    <MoviePage>
      <h2>영확 목록</h2>

      {/* 버튼 선택 상태 연결   */}
      <RatingFilters>
        <FilterButton
          aria-pressed={minRating === undefined && maxRating === undefined}
          onClick={() => changeRating()}
        >
          전체
        </FilterButton>

        <FilterButton
          aria-pressed={minRating === 9 && maxRating === undefined}
          onClick={() => changeRating(9)}
        >
          9점 이상
        </FilterButton>

        <FilterButton
          aria-pressed={minRating === 8 && maxRating === 9}
          onClick={() => changeRating(8, 9)}
        >
          8 ~ 9점
        </FilterButton>

        <FilterButton
          aria-pressed={minRating === 7 && maxRating === 8}
          onClick={() => changeRating(7, 8)}
        >
          7 ~ 8점
        </FilterButton>

        <FilterButton
          aria-pressed={minRating === 6 && maxRating === 7}
          onClick={() => changeRating(6, 7)}
        >
          6 ~ 7점
        </FilterButton>

        <FilterButton
          aria-pressed={minRating === undefined && maxRating === 6}
          onClick={() => changeRating(undefined, 6)}
        >
          6점 미만
        </FilterButton>
      </RatingFilters>

      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard
            className="movie-card"
            key={movie.id}
            to={`/movie/${movie.id}`}
          >
            <PosterBox>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} 포스터`}
              />
              <RatingBadge>⭐ {movie.vote_average.toFixed(1)}</RatingBadge>
            </PosterBox>

            <h2>{movie.title}</h2>
            <p>개봉일: {movie.release_date}</p>
            <p className="overview">{movie.overview}</p>
          </MovieCard>
        ))}
      </MovieGrid>
      {/* 무한 스크롤 구현을 위한 임시 불러오기 버튼 */}
      {/* <button onClick={() => setPage((prev) => prev + 1)}>
          다음 영화 불러오기
        </button> */}
      {isLoading && <p>영화 불러오는 중...</p>}

      {/* 리뷰 반영: 첫 페이지 실패는 목록이 비어 있으니 전체 안내, 다음 페이지 실패는 기존 카드를 유지한 채 하단에만 안내 */}
      {isError && (
        <ErrorMessage>
          {page === 1
            ? "영화 목록을 불러오지 못했습니다."
            : "다음 영화를 불러오지 못했습니다."}
          <button type="button" onClick={() => setIsError(false)}>
            다시 시도
          </button>
        </ErrorMessage>
      )}

      <div ref={loadMoreRef} style={{ height: "1px" }} />
    </MoviePage>
  );
}

// 영화 상세 정보 루트
function App() {
  return (
    <>
      <PageHeader>
        <h1>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            JONG <span>MOVIE</span>
          </Link>
        </h1>
      </PageHeader>

      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
      </Routes>
    </>
  );
}

export default App;
