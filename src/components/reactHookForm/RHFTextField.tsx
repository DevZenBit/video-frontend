import { Box, InputLabel, SxProps, TextField, TextFieldProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { pxToRem } from '@/utils/fontSizing';

interface IRHFTextFieldProps extends Omit<TextFieldProps, 'new'> {
  name: string;
  label?: string;
  isWithoutPadding?: boolean;
  isWithoutErrorText?: boolean;
  boxSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

export const RHFTextField: FC<IRHFTextFieldProps> = ({
  fullWidth,
  required,
  label,
  name,
  helperText,
  isWithoutPadding,
  isWithoutErrorText = false,
  boxSx,
  sx,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: fullWidth ? '100%' : 'initial', ...boxSx }}>
          {label && (
            <InputLabel
              required={required}
              error={!!error}
              htmlFor={name + '-id'}
              sx={{
                mb: 0.5,
                fontWeight: 400,
                fontSize: pxToRem(12),
                lineHeight: pxToRem(24),
                color: 'text.primary'
              }}
            >
              {label}
            </InputLabel>
          )}
          <TextField
            fullWidth={fullWidth}
            {...field}
            variant="outlined"
            id={name + '-id'}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            error={!!error}
            helperText={error ? !isWithoutErrorText && error?.message : helperText}
            sx={{ ...(isWithoutPadding && { p: 0 }), ...sx }}
            {...other}
          />
        </Box>
      )}
    />
  );
};
