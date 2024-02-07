export const AUTH_ROUTES = {
  SIGN_IN: '/auth/sign-in'
};

export const VIEWER_ROUTES = {
  MOVIES: '/viewer/movies',
  CREATE_MOVIE: '/viewer/movies/create',
  updateMovie: (movieId: number) => `/viewer/movies/update/${movieId}`
};
