import { alpha, Theme } from '@mui/material/styles';
import { pxToRem } from '@/utils/fontSizing';

export default function Checkbox(theme: Theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          transition: '150ms',

          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1)
          },
          '& .MuiSvgIcon-root': {
            borderRadius: '5px'
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontWeight: 400,
          fontSize: pxToRem(14),
          lineHeight: pxToRem(24)
        }
      }
    }
  };
}
