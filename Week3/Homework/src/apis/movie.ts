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


export const getMovies = async (
  minRating?: number,
  maxRating?: number,
): Promise<MovieResponse> => {
  const response = await apiClient.get<MovieResponse>("/discover/movie", {
    params: {
      language: "ko-KR",
      page: 1,
      "vote_average.gte": minRating,
      "vote_average.lte": maxRating,
    },
  });

  return response.data;
};
