import { Box, Typography } from '@mui/material';
import { UploadProps } from '@/components/inputs/types';
import { useDropzone } from 'react-dropzone';
import { Image } from '@/components/common/Image';
import { IconifyIcon } from '@/components/common/IconifyIcon';

export const UploadFile = ({ size, isRounded, error, file, disabled, helperText, sx, ...other }: UploadProps) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    disabled,
    ...other
  });

  const hasFile = !!file;

  const isError = isDragReject || !!error;

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          width: size,
          height: size,
          minWidth: size,
          display: 'flex',
          cursor: 'pointer',
          overflow: 'hidden',
          alignItems: 'center',
          position: 'relative',
          justifyContent: 'center',
          borderRadius: isRounded ? '50%' : '10px',
          borderStyle: 'dashed',
          borderWidth: '2px',
          bgcolor: 'background.light',
          ...(isDragActive && {
            opacity: 0.72
          }),
          ...(isError && {
            borderColor: 'error.light',
            ...(hasFile && {
              bgcolor: 'error.lighter'
            })
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none'
          }),
          ...(hasFile && {
            '&:hover': {
              '& .placeholder': {
                opacity: 1
              }
            }
          }),
          ...sx
        }}
      >
        <input {...getInputProps()} />

        {hasFile && (
          <Image
            alt="avatar"
            ratio="1/1"
            src={typeof file === 'string' ? file : URL.createObjectURL(file)}
            style={{
              zIndex: 8,
              position: 'absolute'
            }}
          />
        )}

        <Box
          className="placeholder"
          sx={{
            zIndex: 7,
            display: 'flex',
            borderRadius: '5px',
            position: 'absolute',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',

            '&:hover': {
              opacity: 0.72
            },
            ...(hasFile && {
              zIndex: 9,
              opacity: 0,
              color: 'common.white'
            }),
            ...(isError && {
              color: 'error.main',
              bgcolor: 'error.lighter'
            })
          }}
        >
          <IconifyIcon icon="material-symbols:download" color="common.white" size={24} />
          {helperText && <Typography variant="body2">{helperText}</Typography>}
        </Box>
      </Box>
    </>
  );
};
