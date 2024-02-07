import { ReactElement, useEffect, useState } from 'react';
import { Page } from '@/components/common';
import { Box, Container, Typography } from '@mui/material';
import { en } from '@/locales/en';
import Layout from '@/layouts';
import { useRouter } from 'next/router';
import { CreateUpdateMovie } from '@/components/movies';
import { VIEWER_ROUTES } from '@/router/routes';
import { useLazyGetMovieByIdQuery } from '@/store/api/moviesApi';
import { IMovie } from '@/store/types/viewer/interfaces';

export default function UpdateMovie() {
  const router = useRouter();

  const { movieId } = router.query;

  const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);

  const [getMovieByIdQuery] = useLazyGetMovieByIdQuery();

  useEffect(() => {
    if (!movieId) return;

    getMovieByIdQuery({ movieId: movieId as string }).then((data) => setCurrentMovie(data?.data?.movie || null));
  }, [movieId]);

  const onCancelClick = () => {
    router.push(VIEWER_ROUTES.MOVIES);
  };

  return (
    <Page title={en.movies}>
      <Container maxWidth="xl">
        <Box pt={{ xs: 10, md: 15 }} display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h2" mb={{ xs: 10, md: 15 }}>
            {en.edit}
          </Typography>

          {currentMovie && <CreateUpdateMovie onCancel={onCancelClick} movie={currentMovie} />}
        </Box>
      </Container>
    </Page>
  );
}

UpdateMovie.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="withAuth">{page}</Layout>;
};
