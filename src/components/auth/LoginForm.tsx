import { Alert, Box, Button, Stack } from '@mui/material';
import { FormProvider, RHFCheckbox, RHFTextField } from '@/components/reactHookForm';
import { en } from '@/locales/en';
import { useForm } from 'react-hook-form';
import { LoginFieldNames, LoginValuesProps } from '@/components/auth/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSignInSchema } from './validations/signInValidation';
import { useLazyLoginQuery } from '@/store/api/authApi';
import { useRouter } from 'next/router';
import { VIEWER_ROUTES } from '@/router/routes';
import { alpha } from '@mui/material/styles';

export const LoginForm = () => {
  const router = useRouter();

  const [loginQuery] = useLazyLoginQuery();

  const methods = useForm<LoginValuesProps>({
    defaultValues: {
      [LoginFieldNames.EMAIL]: 'example@example.com',
      [LoginFieldNames.PASSWORD]: 'YourStr0NgPassw0rd123!',
      [LoginFieldNames.REMEMBER_ME]: false
    },
    resolver: yupResolver(validationSignInSchema)
  });

  const {
    setError,
    formState: { errors }
  } = methods;

  const onSubmit = async (data: LoginValuesProps) => {
    const { isSuccess, error } = await loginQuery({
      email: data[LoginFieldNames.EMAIL],
      password: data[LoginFieldNames.PASSWORD],
      rememberMe: data[LoginFieldNames.REMEMBER_ME]!
    });

    if (error) {
      setError('root', { type: 'custom', message: (error as any).data?.message });
    }

    if (isSuccess) {
      router.push(VIEWER_ROUTES.MOVIES);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack direction="column" rowGap={3} alignItems="center">
        {!!errors.root && (
          <Alert
            severity="error"
            color="error"
            variant="outlined"
            sx={{ backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1), width: '100%', color: 'error.light' }}
          >
            {errors.root.message}
          </Alert>
        )}
        <RHFTextField required fullWidth isWithoutPadding name={LoginFieldNames.EMAIL} autoComplete="email" placeholder={en.email} />
        <RHFTextField
          required
          fullWidth
          isWithoutPadding
          name={LoginFieldNames.PASSWORD}
          autoComplete="current-password"
          placeholder={en.password}
        />
        <Box display="flex">
          <RHFCheckbox name={LoginFieldNames.REMEMBER_ME} label={en.rememberMe} />
        </Box>

        <Button fullWidth variant="contained" color="primary" type="submit">
          {en.login}
        </Button>
      </Stack>
    </FormProvider>
  );
};
