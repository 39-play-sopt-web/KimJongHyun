
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  getMovieDetail,
  type MovieDetail as MovieDetailData,
} from "../apis/movie";
import { DetailPage } from "./MovieDetail.styles";

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [isError, setIsError] = useState(false);

  // 과정
  // 1. 포스터 사진 넣고 크기 조절: <> + poster css
  // 2. 뒤에 영화 배경 연하게 깔기 : bg + linear-gradient()
  // 3. 포스터 옆 제목 정보 : here-info
  // 4. 정보 카드 6개 : .info-grid 안에 <div> 6개
  // 5. 카드 3개씩 정렬 css display: grid

  // URL의 영화 ID를 이용해 상세 정보 요청
  useEffect(() => {
    if (!movieId) return;

    let cancelled = false;

    const fetchMovie = async () => {
      try {
        const data = await getMovieDetail(Number(movieId));

        if (!cancelled) {
          setMovie(data);
        }
      } catch {
        if (!cancelled) {
          setIsError(true);
        }
      }
    };

    fetchMovie();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  if (isError) {
    return <p>영화 정보를 불러오지 못했습니다.</p>;
  }

  if (!movie) {
    return <p>영화 정보를 불러오는 중...</p>;
  }

  return (
    <DetailPage>
      <Link className="back-link" to="/">
        ← 목록으로 돌아가기
      </Link>

      {/* 영화 상단 정보 */}
      <section
        className="hero"
        style={{
          backgroundImage: movie.backdrop_path
            ? `linear-gradient(90deg, rgba(20,20,20,0.95), rgba(20,20,20,0.5)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "linear-gradient(90deg, #292929, #141414)",
        }}
      >
        {movie.poster_path && (
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} 포스터`}
          />
        )}

        <div className="hero-info">
          <h1>{movie.title}</h1>

          <p>개봉일: {movie.release_date || "정보 없음"}</p>
          <p>⭐ {movie.vote_average.toFixed(1)} / 10</p>
          <p>
            상영 시간: {movie.runtime != null ? `${movie.runtime}분` : "정보 없음"}
          </p>
          <p>투표 수: {movie.vote_count.toLocaleString()}</p>
          <p>상태: {movie.status}</p>

          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 영화 줄거리 */}
      <section className="content-section">
        <h2>줄거리</h2>
        <p className="overview">
          {movie.overview || "등록된 줄거리가 없습니다."}
        </p>
      </section>

      {/* 영화 기본 정보 */}
      <section className="content-section">
        <h2>기본 정보</h2>

        <div className="info-grid">
          <div className="info-item">
            <p>원제</p>
            {movie.original_title || "정보 없음"}
          </div>

          <div className="info-item">
            <p>원어</p>
            {movie.original_language || "정보 없음"}
          </div>

          <div className="info-item">
            <p>제작 국가</p>
            {movie.production_countries
              .map((country) => country.name)
              .join(", ") || "정보 없음"}
          </div>

          <div className="info-item">
            <p>사용 언어</p>
            {movie.spoken_languages
              .map((language) => language.name)
              .join(", ") || "정보 없음"}
          </div>

          <div className="info-item">
            <p>예산</p>
            {movie.budget > 0
              ? `$${movie.budget.toLocaleString()}`
              : "정보 없음"}
          </div>

          <div className="info-item">
            <p>수익</p>
            {movie.revenue > 0
              ? `$${movie.revenue.toLocaleString()}`
              : "정보 없음"}
          </div>
        </div>
      </section>
    </DetailPage>
  );
}

export default MovieDetail;
