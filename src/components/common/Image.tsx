import { Box, BoxProps } from '@mui/material';
import { forwardRef } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import getRatio from '@/utils/fontSizing';

type IProps = BoxProps & LazyLoadImageProps;

export interface ImageProps extends IProps {
  ratio?: '4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1';
  disabledEffect?: boolean;
}

export const Image = forwardRef<HTMLSpanElement, ImageProps>(({ ratio, disabledEffect = false, effect = 'blur', sx, ...other }, ref) => {
  const content = (
    <Box
      component={LazyLoadImage}
      wrapperClassName="wrapper"
      effect={disabledEffect ? undefined : effect}
      placeholderSrc={'/placeholder.svg'}
      sx={{ width: 1, height: 1, objectFit: 'cover' }}
      {...other}
    />
  );

  if (ratio) {
    return (
      <Box
        ref={ref}
        component="span"
        sx={{
          width: 1,
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            position: 'absolute',
            backgroundSize: 'cover !important'
          },
          ...sx
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      component="span"
      sx={{
        lineHeight: 1,
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        '& .wrapper': {
          width: 1,
          height: 1,
          backgroundSize: 'cover !important'
        },
        ...sx
      }}
    >
      {content}
    </Box>
  );
});
