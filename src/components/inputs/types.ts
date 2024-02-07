import { DropzoneOptions } from 'react-dropzone';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

export interface UploadProps extends DropzoneOptions {
  size?: number;
  isRounded?: boolean;
  havePreview?: boolean;
  error?: boolean;
  sx?: SxProps<Theme>;
  thumbnail?: boolean;
  placeholder?: ReactNode;
  helperText?: ReactNode;
  disableMultiple?: boolean;
  file?: File | string | null;
  onDelete?: VoidFunction;
  files?: Array<File | string>;
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
}
