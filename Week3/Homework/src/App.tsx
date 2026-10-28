//다시 정리
//usestate: 화면에서 쓸 데이터를 상태로 관리
//useeffect: 렌더링, 영화 과제에서는 평점이 바뀔때마다 api 재요청
//의존성 배열 []: 처음 마운트 될때, [~,~]: 해당 ~이벤트가 있을때

import { useEffect, useState } from "react";
import { getMovies, type Movie } from "./apis/movie";
import "./App.css"; // 추가

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [minRating, setMinRating] = useState<number>();
  const [maxRating, setMaxRating] = useState<number>();

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies(minRating, maxRating);
      setMovies(data.results);
    };

    fetchMovies();
  }, [minRating, maxRating]);

  return (
    <div className="movie-page">
      <div className="rating-filters">
        <button
          onClick={() => {
            setMinRating(undefined);
            setMaxRating(undefined);
          }}
        >
          전체
        </button>

        <button
          onClick={() => {
            setMinRating(9);
            setMaxRating(undefined);
          }}
        >
          9점 이상
        </button>

        <button
          onClick={() => {
            setMinRating(8);
            setMaxRating(9);
          }}
        >
          8 ~ 9점
        </button>

        <button
          onClick={() => {
            setMinRating(7);
            setMaxRating(8);
          }}
        >
          7 ~ 8점
        </button>

        <button
          onClick={() => {
            setMinRating(6);
            setMaxRating(7);
          }}
        >
          6 ~ 7점
        </button>

        <button
          onClick={() => {
            setMinRating(undefined);
            setMaxRating(6);
          }}
        >
          6점 미만
        </button>
      </div>
      <h1>영화 탐색 페이지</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} 포스터`}
            />
            <h2>{movie.title}</h2>
            <p>⭐ {movie.vote_average.toFixed(1)}</p>
            <p>개봉일: {movie.release_date}</p>
            <p>{movie.overview}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default App;
