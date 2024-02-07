import { ReactElement, useEffect } from 'react';
import { AUTH_ROUTES } from '@/router/routes';
import { useRouter } from 'next/router';
import { Page } from '@/components/common';
import { Box, LinearProgress, Typography } from '@mui/material';
import { en } from '@/locales/en';
import Layout from '@/layouts';

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push(AUTH_ROUTES.SIGN_IN);
  }, []);

  return (
    <Page title={en.projectName}>
      <LinearProgress color="primary" sx={{ backgroundColor: 'background.default' }} />

      <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="h1">{en.projectName}</Typography>
      </Box>
    </Page>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
