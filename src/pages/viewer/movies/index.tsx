import { ReactElement, useEffect, useState } from "react";
import { Loader, Page } from "@/components/common";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { en } from "@/locales/en";
import Layout from "@/layouts";
import { useLazyGetPaginatedMoviesQuery } from "@/store/api/moviesApi";
import { useAppSelector } from "@/store";
import { selectMoviesData } from "@/store/reducers/viewer";
import { MoviesHeader, MoviesList } from "@/components/movies";
import { MovieModal } from "@/components/movies/MovieModal";
import { LayoutVariants } from "@/layouts/enums";

export default function Movies() {
  const moviesData = useAppSelector(selectMoviesData);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [getPaginatedMoviesQuery, { isFetching, isLoading }] =
    useLazyGetPaginatedMoviesQuery();

  useEffect(() => {
    getPaginatedMoviesQuery({});
  }, []);

  const onAddNewMovieClick = () => {
    setModalOpen(true);
  };

  const isNeedLoader = isFetching || isLoading;

  return (
    <Page title={en.movies}>
      {isNeedLoader && <Loader />}

      {!isNeedLoader && (
        <Container maxWidth="xl">
          <MovieModal
            isOpen={modalOpen}
            title={en.createNewMovie}
            handleClose={() => setModalOpen(false)}
          />
          {!!moviesData.items.length ? (
            <Stack display="flex" pt={{ xs: 10, md: 15 }}>
              <MoviesHeader onAddNewMovieClick={onAddNewMovieClick} />
              <MoviesList />
            </Stack>
          ) : (
            <Box
              minHeight="100vh"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h2" mb={5}>
                {en.yourMovieListIsEmpty}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={onAddNewMovieClick}
              >
                {en.addNewMovie}
              </Button>
            </Box>
          )}
        </Container>
      )}
    </Page>
  );
}

Movies.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant={LayoutVariants.withAuth}>{page}</Layout>;
};
