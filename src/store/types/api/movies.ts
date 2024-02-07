import { IMovie } from '../viewer/interfaces';

export interface GetPaginatedMoviesResponse {
  movies: IMovie[];
  totalCount: number;
}

export interface GetPaginatedMoviesRequest {
  skipPages?: string | number;
  pageSize?: string | number;
}

export interface CreateMovieResponse {
  movie: IMovie;
}

export interface CreateMovieRequest {
  formData: any;
}

export interface UpdateMovieResponse {
  movie: IMovie;
}

export interface UpdateMovieRequest {
  formData: any;
  movieId: number;
}

export interface GetMovieByIdResponse {
  movie: IMovie;
}

export interface GetMovieByIdRequest {
  movieId: string;
}
