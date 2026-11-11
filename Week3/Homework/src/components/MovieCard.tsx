import styled from "@emotion/styled";
import { Link } from "react-router";
import type { Movie } from "../apis/movie";
import { theme } from "../styles/theme";

// 영화 카드 hover 효과
// 기존 영화 카드 > 클릭하면 주소 이동가능한 영화 카드(link)
const Card = styled(Link)`
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

// 포스터가 없는 영화의 대체 화면. 카드 높이가 흔들리지 않게 포스터 비율(2:3) 유지
const NoPoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 2 / 3;
  width: 100%;
  border-radius: 12px;
  background-color: #2a2f3f;
  color: #aaa;
  font-size: 14px;
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

interface MovieCardProps {
  movie: Movie;
}

// 목록에서 영화 한 편을 보여주는 카드. 클릭하면 상세 페이지로 이동
function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card to={`/movie/${movie.id}`}>
      <PosterBox>
        {/* 리뷰 반영: poster_path가 null이면 주소가 .../w500null이 되어 깨진 이미지가 보임. 상세 페이지처럼 대체 화면 표시 */}
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <NoPoster>포스터 없음</NoPoster>
        )}
        <RatingBadge>⭐ {movie.vote_average.toFixed(1)}</RatingBadge>
      </PosterBox>

      <h2>{movie.title}</h2>
      <p>개봉일: {movie.release_date}</p>
      <p className="overview">{movie.overview}</p>
    </Card>
  );
}

export default MovieCard;
