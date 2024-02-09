import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    light: string;
    dark: string;
  }
}

const Palette = () => {
  return createTheme({
    palette: {
      text: {
        primary: "#fff",
        secondary: "#fff",
      },
      primary: {
        main: "#494747",
      },
      secondary: {
        main: "#fff",
      },
      common: {
        black: "#000",
        white: "#fff",
      },
      background: {
        paper: "#fff",
        light: "#38353959",
        default: "#88c3ea",
        dark: "#38353959",
      },
      error: {
        main: "#EB5757",
      },
    },
  });
};

export default Palette;
