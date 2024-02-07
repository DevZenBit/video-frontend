import { Box, Pagination, Stack } from '@mui/material';
import { MovieCard } from '@/components/movies/MovieCard';
import { useAppSelector } from '@/store';
import { selectMoviesData } from '@/store/reducers/viewer';
import { MAX_MOVIES_PER_PAGE } from '@/constants';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { VIEWER_ROUTES } from '@/router/routes';
import { useLazyGetPaginatedMoviesQuery } from '@/store/api/moviesApi';

export const MoviesList = () => {
  const { push } = useRouter();

  const moviesData = useAppSelector(selectMoviesData);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [getPaginatedMoviesQuery] = useLazyGetPaginatedMoviesQuery();

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);

    getPaginatedMoviesQuery({ skipPages: Number(newPage - 1), pageSize: MAX_MOVIES_PER_PAGE });
  };

  const handleCardClick = (movieId: number) => () => {
    push(VIEWER_ROUTES.updateMovie(movieId));
  };

  return (
    <Stack width="100%" display="flex" mt={{ xs: 10, md: 15 }} mb={{ xs: 15, md: 30 }}>
      <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" gap={3}>
        {!!moviesData.items.length &&
          moviesData.items
            .slice(0, MAX_MOVIES_PER_PAGE)
            .map(({ id, title, publishingYear, poster }) => (
              <MovieCard key={id} title={title} poster={poster} publishingYear={publishingYear} onClick={handleCardClick(id)} />
            ))}
      </Box>

      {!!moviesData.count && moviesData.count > MAX_MOVIES_PER_PAGE && (
        <Box width="100%" display="flex" justifyContent="center" mt={{ xs: 5, md: 15 }}>
          <Pagination
            sx={{ paddingTop: '10px' }}
            color="primary"
            count={Math.ceil(moviesData.count / MAX_MOVIES_PER_PAGE) || 0}
            shape="rounded"
            page={currentPage}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </Stack>
  );
};
