//다시 정리
//usestate: 화면에서 쓸 데이터를 상태로 관리
//useeffect: 영화 과제에서는 평점이 바뀔때마다 api 재요청
//의존성 배열 []: 처음 마운트 될때, [~,~]: 해당 ~이벤트가 있을때

import { useEffect, useState, useRef } from "react";
import { getMovies, type Movie } from "./apis/movie";
import "./App.css";
import styled from "@emotion/styled";
import { theme } from "./styles/theme";

// emotion으로 CSS변경 진짜 모르겠다 CSS세상은 다음 딥다이브주제다

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

  h1 button {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }

  /* 찾았다 span 부분은 primary 색 */
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
const MovieCard = styled.article`
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const RatingFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
`;

const FilterButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background-color: #333;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [minRating, setMinRating] = useState<number>();
  const [maxRating, setMaxRating] = useState<number>();

  // 무한 스크롤 구현하기 위한 usestate 추가
  // 단순 page만 있어도 구현은 되는데 반복 요청, 불필요한 요청없이 안정적으로 작동하도록 도와줌
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        const data = await getMovies(minRating, maxRating, page);

        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results],
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [minRating, maxRating, page]);

  //제일 중요한거 무한 스크롤
  // intersectionobserver: 감시하는 객체
  // 페이지 밑에 도착했어? > 다음페이지로 변경(이어붙여)
  useEffect(() => {
    if (movies.length === 0 || isLoading) return;

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
  }, [movies, isLoading]);

  return (
    <>
      <PageHeader>
        <h1>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {/* span:문장이나 글자의 일부분만 묶음 */}
            JONG <span>MOVIE</span>
          </button>
        </h1>
      </PageHeader>

      <MoviePage>
        <h2>영확 목록</h2>
        <RatingFilters>
          <FilterButton
            onClick={() => {
              setMinRating(undefined);
              setMaxRating(undefined);
            }}
          >
            전체
          </FilterButton>

          <FilterButton
            onClick={() => {
              setMinRating(9);
              setMaxRating(undefined);
            }}
          >
            9점 이상
          </FilterButton>

          <FilterButton
            onClick={() => {
              setMinRating(8);
              setMaxRating(9);
            }}
          >
            8 ~ 9점
          </FilterButton>

          <FilterButton
            onClick={() => {
              setMinRating(7);
              setMaxRating(8);
            }}
          >
            7 ~ 8점
          </FilterButton>

          <FilterButton
            onClick={() => {
              setMinRating(6);
              setMaxRating(7);
            }}
          >
            6 ~ 7점
          </FilterButton>

          <FilterButton
            onClick={() => {
              setMinRating(undefined);
              setMaxRating(6);
            }}
          >
            6점 미만
          </FilterButton>
        </RatingFilters>
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard className="movie-card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} 포스터`}
              />
              <h2>{movie.title}</h2>
              <p>⭐ {movie.vote_average.toFixed(1)}</p>
              <p>개봉일: {movie.release_date}</p>
              <p>{movie.overview}</p>
            </MovieCard>
          ))}
        </MovieGrid>
        {/* 무한 스크롤 구현을 위한 임시 불러오기 버튼 */}
        {/* <button onClick={() => setPage((prev) => prev + 1)}>
          다음 영화 불러오기
        </button> */}
        {isLoading && <p>영화 불러오는 중...</p>}

        <div ref={loadMoreRef} style={{ height: "1px" }} />
      </MoviePage>
    </>
  );
}

export default App;
