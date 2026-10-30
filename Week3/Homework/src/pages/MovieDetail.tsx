import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getMovieDetail, type Movie } from "../apis/movie";

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      const data = await getMovieDetail(Number(movieId));
      setMovie(data);
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <p>영화 정보를 불러오는 중...</p>;

  return (
    <main>
      <Link to="/">← 목록으로 돌아가기</Link>

      <h1>{movie.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
      />

      <p>⭐ {movie.vote_average.toFixed(1)}</p>
      <p>개봉일: {movie.release_date}</p>
      <p>{movie.overview}</p>
    </main>
  );
}

export default MovieDetail;