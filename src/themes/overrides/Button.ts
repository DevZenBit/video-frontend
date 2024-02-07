import { Theme } from "@mui/material/styles";
import { pxToRem } from "@/utils/fontSizing";

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          opacity: 1,
          color: theme.palette.text.primary,
          padding: "16px 28px",
          boxShadow: "none",
          fontSize: pxToRem(16),
          fontWeight: 700,
          lineHeight: pxToRem(24),
          textTransform: "initial",

          "&:hover": {
            boxShadow: "none",
          },
        },

        outlined: {
          color: theme.palette.text.primary,
          borderColor: theme.palette.background.paper,
        },
      },
    },
  };
}
