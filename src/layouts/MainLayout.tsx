import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const StyledMain = styled.main`
  position: relative;
  min-height: 100vh;
  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    pointer-events: none;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background-image: url('/waves.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom center;
  }
`;

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
