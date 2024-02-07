import { Theme } from "@mui/material/styles";
import { pxToRem } from "@/utils/fontSizing";

export default function TextField(theme: Theme) {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: 16,

          "& .MuiOutlinedInput-root": {
            fontSize: pxToRem(14),
            backgroundColor: theme.palette.background.light,
            fontWeight: 400,
            color: theme.palette.text.primary,
            borderRadius: "4px",

            "& fieldset": {
              borderColor: theme.palette.background.light,
            },

            "& ::placeholder": {
              color: theme.palette.text.primary,
              opacity: 1,
            },
          },

          "& .Mui-focused fieldset": {
            borderColor: `${theme.palette.text.primary} !important`,
            borderWidth: "1px !important",
          },

          "& input.Mui-disabled": {
            backgroundColor: theme.palette.background.light,
            color: theme.palette.text.primary,
            WebkitTextFillColor: theme.palette.text.primary,
            borderRadius: theme.shape.borderRadius,
          },

          "& .Mui-error": {
            color: theme.palette.error.main,
            lineHeight: "100%",
          },

          "& .MuiFormHelperText-root": {
            marginLeft: 0,
            fontWeight: 400,
            fontSize: pxToRem(12),
            lineHeight: pxToRem(24),
          },

          [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
            "& .MuiFormHelperText-root": {
              marginLeft: 16,
              fontSize: pxToRem(10),
            },
          },
        },
      },
    },
  };
}
