import { ReactElement } from 'react';
import { Page } from '@/components/common';
import { Box, Container, Typography } from '@mui/material';
import { en } from '@/locales/en';
import Layout from '@/layouts';
import { useRouter } from 'next/router';
import { VIEWER_ROUTES } from '@/router/routes';
import { CreateUpdateMovie } from '@/components/movies';

export default function CreateMovie() {
  const router = useRouter();

  const onCancelClick = () => {
    router.push(VIEWER_ROUTES.MOVIES);
  };

  return (
    <Page title={en.movies}>
      <Container maxWidth="xl">
        <Box pt={{ xs: 10, md: 15 }} display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h2" mb={{ xs: 10, md: 15 }}>
            {en.createNewMovie}
          </Typography>

          <CreateUpdateMovie onCancel={onCancelClick} />
        </Box>
      </Container>
    </Page>
  );
}

CreateMovie.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="withAuth">{page}</Layout>;
};
