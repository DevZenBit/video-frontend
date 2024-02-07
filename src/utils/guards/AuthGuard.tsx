import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { AUTH_ROUTES } from '@/router/routes';
import { Loader } from '@/components/common';
import { en } from '@/locales/en';

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  const { isAuthenticated, isInitialized } = useAuthContext();

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      (async () => await router.push({ pathname: AUTH_ROUTES.SIGN_IN }))();
    }
  }, [isAuthenticated, isInitialized]);

  if (!isInitialized) return <Loader />;

  if (!isAuthenticated)
    return (
      <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Loader />
        <Typography variant="h1">{en.projectName}</Typography>
      </Box>
    );

  return <> {children} </>;
}
