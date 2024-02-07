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
        main: "#a70fc1d4",
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
        light: "#c627e159",
        default: "#88c3ea",
        dark: "#c627e159",
      },
      error: {
        main: "#EB5757",
      },
    },
  });
};

export default Palette;
