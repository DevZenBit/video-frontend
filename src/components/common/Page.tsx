import { forwardRef, ReactNode, Ref } from 'react';
import Head from 'next/head';
import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title?: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }: Props, ref: Ref<HTMLDivElement>) => {
  return (
    <>
      <Head>
        <title>{title ? `${title}` : 'Assignment'}</title>
        {meta}
      </Head>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  );
});

export default Page;
