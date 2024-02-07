import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 5
}));

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" sx={{ backgroundColor: 'background.default', position: 'absolute', top: 0, width: '100%' }} />
  </LoaderWrapper>
);

export default Loader;
