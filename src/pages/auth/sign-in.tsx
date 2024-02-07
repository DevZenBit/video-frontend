import { ReactElement } from 'react';
import { Page } from '@/components/common';
import { Box, Typography } from '@mui/material';
import { en } from '@/locales/en';
import Layout from '@/layouts';
import { LoginForm } from '@/components/auth';

export default function SignIn() {
  return (
    <Page title={en.signIn}>
      <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="h1" mb={{ xs: 3, md: 5 }}>
          {en.signIn}
        </Typography>

        <Box width="100%" maxWidth={300} display="flex">
          <LoginForm />
        </Box>
      </Box>
    </Page>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
