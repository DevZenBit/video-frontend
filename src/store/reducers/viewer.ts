import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie, IViewer } from "../types/viewer/interfaces";
import { resetAll, RootState } from "../index";

export interface IViewerState {
  viewer?: IViewer;
  movies: {
    items: IMovie[];
    count: number;
  };
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: IViewerState = {
  viewer: undefined,
  movies: {
    items: [],
    count: 0,
  },
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
};

export const viewer = createSlice({
  initialState,
  name: "viewer",
  reducers: {
    setViewerWithTokens: (
      state,
      action: PayloadAction<{
        viewer: IViewer;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.viewer = action.payload.viewer;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateViewer: (state, action: PayloadAction<IViewer>) => {
      state.viewer = { ...state.viewer, ...action.payload };
    },
    removeViewer: (state) => {
      state.viewer = undefined;
      state.isAuthenticated = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
    setMovies: (
      state,
      action: PayloadAction<{
        items: IMovie[];
        count: number;
      }>
    ) => {
      state.movies = action.payload;
    },
    updateMovies: (state, action: PayloadAction<IMovie>) => {
      state.movies.items = [...state.movies.items, action.payload];
      state.movies.count += 1;
    },
    updateMovie: (state, action: PayloadAction<IMovie>) => {
      const updatedMovie = action.payload;

      const index = state.movies.items.findIndex(
        (movie) => movie.id === updatedMovie.id
      );

      if (index !== -1) {
        state.movies.items[index] = updatedMovie;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);
  },
});

export default viewer.reducer;

export const { setViewerWithTokens, setMovies, updateMovies, updateMovie } =
  viewer.actions;

export const selectAccessToken = (state: RootState): string =>
  state.viewer.accessToken;
export const selectRefreshToken = (state: RootState): string =>
  state.viewer.refreshToken;
export const selectViewer = (state: RootState): IViewer | undefined =>
  state.viewer.viewer;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.viewer.isAuthenticated;
export const selectMoviesData = (
  state: RootState
): {
  items: IMovie[];
  count: number;
} => state.viewer.movies;
