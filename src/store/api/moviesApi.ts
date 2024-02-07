import { baseCreateApi } from './baseCreateApi';
import { HttpMethods } from '../types/api/common';
import { setMovies } from '../reducers/viewer';
import {
  CreateMovieRequest,
  CreateMovieResponse,
  GetMovieByIdRequest,
  GetMovieByIdResponse,
  GetPaginatedMoviesRequest,
  GetPaginatedMoviesResponse,
  UpdateMovieRequest,
  UpdateMovieResponse
} from '@/store/types/api/movies';
import { generateUrlWithQueryParams } from '@/utils/url';
import { MAX_MOVIES_PER_PAGE } from '@/constants';

export const moviesApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedMovies: builder.query<GetPaginatedMoviesResponse, GetPaginatedMoviesRequest>({
      query({ skipPages = 0, pageSize = MAX_MOVIES_PER_PAGE }) {
        return {
          url: generateUrlWithQueryParams('/users/movies', { skipPages, pageSize }),
          method: HttpMethods.GET
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled.then(({ data }) => {
            dispatch(setMovies({ items: data.movies, count: data.totalCount }));
          });
        } catch (e: any) {
          console.info(`Error: moviesApi > getPaginatedMovies [ ${e?.error?.data?.message} ]`);
        }
      }
    }),
    getMovieById: builder.query<GetMovieByIdResponse, GetMovieByIdRequest>({
      query({ movieId }) {
        return {
          url: `/users/movies/${movieId}`,
          method: HttpMethods.GET
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled.then(({ data }) => {});
        } catch (e: any) {
          console.info(`Error: moviesApi > getMovieById [ ${e?.error?.data?.message} ]`);
        }
      }
    }),
    createMovie: builder.mutation<CreateMovieResponse, CreateMovieRequest>({
      query({ formData }) {
        return {
          url: '/users/movies',
          method: HttpMethods.POST,
          body: formData,
          useFormData: true
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled.then(({ data }) => {});
        } catch (e: any) {
          console.info(`Error: moviesApi > createMovie [ ${e?.error?.data?.message} ]`);
        }
      }
    }),
    updateMovie: builder.mutation<UpdateMovieResponse, UpdateMovieRequest>({
      query({ formData, movieId }) {
        return {
          url: `/users/movies/${movieId}`,
          method: HttpMethods.PATCH,
          body: formData,
          useFormData: true
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled.then(({ data }) => {});
        } catch (e: any) {
          console.info(`Error: moviesApi > updateMovie [ ${e?.error?.data?.message} ]`);
        }
      }
    })
  }),
  overrideExisting: true
});

export const { useLazyGetPaginatedMoviesQuery, useCreateMovieMutation, useLazyGetMovieByIdQuery, useUpdateMovieMutation } = moviesApi;
