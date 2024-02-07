import { FormHelperText } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { UploadFile } from '@/components/inputs/UploadAvatar';
import { UploadProps } from '@/components/inputs/types';

interface Props extends Omit<UploadProps, 'file'> {
  size: number;
  isRounded?: boolean;
  havePreview?: boolean;
  name: string;
  multiple?: boolean;
}

export const RHFUploadFile = ({ name, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadFile
            accept={{
              'image/*': []
            }}
            error={!!error}
            file={field.value}
            {...other}
          />

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
};
