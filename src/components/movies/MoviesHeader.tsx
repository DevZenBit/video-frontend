import { Box, Button, IconButton, Typography } from '@mui/material';
import { en } from '@/locales/en';
import { IconifyIcon } from '@/components/common/IconifyIcon';
import { FC } from 'react';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { useResponsiveness } from '@/utils/hooks/useResponsiveness';

interface MoviesHeaderProps {
  onAddNewMovieClick: VoidFunction;
}

export const MoviesHeader: FC<MoviesHeaderProps> = ({ onAddNewMovieClick }) => {
  const { logout } = useAuthContext();

  const isMobile = useResponsiveness('down', 'md');

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems={{ xs: 'center', md: 'flex-end' }} columnGap={1}>
        <Typography variant="h2">{en.myMovies}</Typography>
        <Box>
          <IconButton onClick={onAddNewMovieClick} sx={{ color: 'common.white' }}>
            <IconifyIcon size={{ xs: 24, md: 32 }} icon="icons8:plus" />
          </IconButton>
        </Box>
      </Box>
      <Button onClick={logout} sx={{ px: 1 }}>
        {!isMobile && en.logOut}
        <IconifyIcon ml={{ xs: 1, md: 2 }} size={24} icon="mdi:logout" />
      </Button>
    </Box>
  );
};
