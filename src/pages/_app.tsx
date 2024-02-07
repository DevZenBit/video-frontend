import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeCustomization from '@/themes';
import { store } from '@/store';
import { AuthProvider } from '@/layouts/context/AuthContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps & Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ReduxProvider store={store}>
      <ThemeCustomization>
        <ToastContainer position="top-left" />

        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </ThemeCustomization>
    </ReduxProvider>
  );
}
