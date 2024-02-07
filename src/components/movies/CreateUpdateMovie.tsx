import { Alert, Box, Button, Stack } from '@mui/material';
import { en } from '@/locales/en';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUpdateMovieFieldNames, CreateUpdateMovieValuesProps } from '@/components/movies/types';
import { IMovie } from '@/store/types/viewer/interfaces';
import { RHFUploadFile } from '@/components/reactHookForm/RHFUploadFile';
import { FormProvider, RHFTextField } from '@/components/reactHookForm';
import { validationCreateUpdateMovieSchema } from '@/components/movies/validations/signInValidation';
import { useCreateMovieMutation, useUpdateMovieMutation } from '@/store/api/moviesApi';
import { useRouter } from 'next/router';
import { VIEWER_ROUTES } from '@/router/routes';
import { alpha } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useResponsiveness } from '@/utils/hooks/useResponsiveness';

interface CreateUpdateMovieProps {
  onCancel: VoidFunction;
  movie?: IMovie;
}

export const CreateUpdateMovie: FC<CreateUpdateMovieProps> = ({ onCancel, movie }) => {
  const router = useRouter();

  const isMobile = useResponsiveness('down', 'md');

  const [createMovieMutation] = useCreateMovieMutation();
  const [updateMovieMutation] = useUpdateMovieMutation();

  const methods = useForm<CreateUpdateMovieValuesProps>({
    defaultValues: {
      [CreateUpdateMovieFieldNames.TITLE]: movie?.title || '',
      [CreateUpdateMovieFieldNames.PUBLISHING_YEAR]: movie?.publishingYear ? String(movie?.publishingYear) : '',
      [CreateUpdateMovieFieldNames.POSTER]: movie?.poster || null
    },
    //@ts-ignore
    resolver: yupResolver(validationCreateUpdateMovieSchema)
  });

  const {
    setError,
    setValue,
    formState: { errors }
  } = methods;

  const onSubmit = async (data: CreateUpdateMovieValuesProps) => {
    const formData = new FormData();

    if (typeof data[CreateUpdateMovieFieldNames.POSTER] !== 'string') {
      formData.append('file', data[CreateUpdateMovieFieldNames.POSTER] as File);
    }

    formData.append('title', data[CreateUpdateMovieFieldNames.TITLE]);
    formData.append('publishingYear', data[CreateUpdateMovieFieldNames.PUBLISHING_YEAR]);

    let respData;

    if (movie) {
      respData = await updateMovieMutation({ formData, movieId: movie.id });
    } else {
      respData = await createMovieMutation({ formData });

      if ((respData as any)?.data) {
        router.push(VIEWER_ROUTES.MOVIES);
      }
    }

    if ((respData as any)?.error) {
      setError('root', { type: 'custom', message: (respData as any).error.data?.message });
    } else {
      toast.success(en.success);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(CreateUpdateMovieFieldNames.POSTER, file, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column-reverse', md: 'row' }}
        flexWrap="wrap"
        columnGap={{ xs: 0, md: '110px' }}
        maxWidth={{ xs: 500, md: 'unset' }}
        pb={20}
        mx="auto"
      >
        <Stack>
          <Box display="flex" justifyContent="center">
            <RHFUploadFile
              size={isMobile ? 280 : 500}
              name={CreateUpdateMovieFieldNames.POSTER}
              helperText={en.dropImageHere}
              onDrop={handleDrop}
            />
          </Box>
          {isMobile && (
            <Box display="flex" columnGap={2} mt={8}>
              <Button fullWidth variant="outlined" color="secondary" onClick={onCancel}>
                {en.cancel}
              </Button>
              <Button fullWidth variant="contained" color="primary" type="submit">
                {movie ? en.update : en.submit}
              </Button>
            </Box>
          )}
        </Stack>
        <Stack maxWidth={{ xs: '100%', md: 362 }} width={{ xs: '100%', md: '40%' }}>
          {!!errors.root && (
            <Alert
              severity="error"
              color="error"
              variant="outlined"
              sx={{ backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1), width: '100%', color: 'error.light', mb: 3 }}
            >
              {errors.root.message}
            </Alert>
          )}
          <RHFTextField
            required
            fullWidth
            isWithoutPadding
            name={CreateUpdateMovieFieldNames.TITLE}
            autoComplete="none"
            placeholder={en.title}
          />
          <RHFTextField
            required
            fullWidth
            isWithoutPadding
            name={CreateUpdateMovieFieldNames.PUBLISHING_YEAR}
            autoComplete="none"
            placeholder={en.publishingYear}
            sx={{ mt: 3, maxWidth: { xs: '100%', md: 216 }, mb: { xs: 3, md: 0 } }}
          />
          {!isMobile && (
            <Box display="flex" columnGap={2} mt={{ xs: 5, md: 8 }}>
              <Button fullWidth variant="outlined" color="secondary" onClick={onCancel}>
                {en.cancel}
              </Button>
              <Button fullWidth variant="contained" color="primary" type="submit">
                {movie ? en.update : en.submit}
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    </FormProvider>
  );
};
