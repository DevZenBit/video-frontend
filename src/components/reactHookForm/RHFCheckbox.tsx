import { Checkbox, FormControlLabel, FormControlLabelProps, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { ReactNode } from 'react';

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: ReactNode;
}

export const RHFCheckbox = ({ name, helperText, ...other }: RHFCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            sx={{ color: error ? 'error.main' : 'text.primary' }}
            control={
              <Checkbox
                {...field}
                checked={field.value}
                sx={{
                  color: 'background.light'
                }}
              />
            }
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ ml: 3.5, mt: -1.5, fontSize: '0.8em' }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
};
