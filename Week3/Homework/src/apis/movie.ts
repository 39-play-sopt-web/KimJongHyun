import apiClient from "./apiClient";


export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
}

// movie: 영화 하나, movie[]: 영화 배열
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// async, await 비동기 처리
// Promise<MovieResponse> : 비동기를 거쳐 MovieResponse 타입의 값을 돌려준다
// vote_average.gte	평점이 특정 값 이상
// vote_average.lte	평점이 특정 값 이하


// 평점을 신뢰할 수 있는 최소 투표 수
const MIN_VOTE_COUNT = 100;

export const getMovies = async (
  minRating?: number,
  maxRating?: number,
  page: number = 1
  
): Promise<MovieResponse> => {
  const response = await apiClient.get<MovieResponse>("/discover/movie", {
    params: {
      language: "ko-KR",
      "vote_average.gte": minRating,
      // 리뷰 반영: TMDB의 lte는 "이하"라 maxRating이 9면 9.0이 포함됨
      // 화면은 "미만"으로 쓰고 있으니 아주 작은 값을 빼서 경계가 겹치지 않게 함
      "vote_average.lte":
        maxRating === undefined ? undefined : maxRating - 0.001,
      // 리뷰 반영: 투표 1~2개짜리 영화가 "9점 이상"에 몰리는 걸 막기 위한 최소 투표 수
      "vote_count.gte": MIN_VOTE_COUNT,
      page,
    },
  });

  return response.data;
};

// 영화 ID를 이용해 상세 정보 가져오기
export const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const response = await apiClient.get<MovieDetail>(`/movie/${movieId}`, {
    params: {
      language: "ko-KR",
    },
  });

  return response.data;
  };



// 영화 상세 페이지
  export interface MovieDetail extends Movie {
  backdrop_path: string | null;
  runtime: number | null;
  vote_count: number;
  status: string;
  original_title: string;
  original_language: string;
  budget: number;
  revenue: number;

  genres: {
    id: number;
    name: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
}


  