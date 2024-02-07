import { ReactNode, useMemo } from 'react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from '@mui/material/styles';
import Palette from './palette';
import Typography from './typography';
import componentsOverride from './overrides';

interface ThemeCustomizationProps {
  children: ReactNode;
}

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const theme: Theme = useMemo<Theme>(() => Palette(), []);

  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(() => Typography(theme), [theme]);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1250
        }
      },
      palette: theme.palette,
      typography: themeTypography
    }),
    [theme, themeTypography]
  );

  const themes: Theme = createTheme(themeOptions);

  //@ts-ignore
  themes.components = { ...theme.components, ...componentsOverride(themes) };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
