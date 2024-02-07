export const pxToRem = (value: number) => `${value / 16}rem`;

export default function getRatio(ratio = '1/1') {
  return {
    '4/3': 'calc(100% / 4 * 3)',
    '3/4': 'calc(100% / 3 * 4)',
    '6/4': 'calc(100% / 6 * 4)',
    '4/6': 'calc(100% / 4 * 6)',
    '16/9': 'calc(100% / 16 * 9)',
    '9/16': 'calc(100% / 9 * 16)',
    '21/9': 'calc(100% / 21 * 9)',
    '9/21': 'calc(100% / 9 * 21)',
    '1/1': '100%'
  }[ratio];
}

interface IResponsiveSizes {
  [key: string]: string | { fontSize: string };
}

export const responsiveFontSizes = ({ sm, md, def }: { sm?: number; md?: number; def: number }) => {
  const sizes: IResponsiveSizes = {
    fontSize: pxToRem(def)
  };

  if (sm) {
    sizes[`@media (max-width:768px)`] = {
      fontSize: pxToRem(sm)
    };
  }

  if (md) {
    sizes[`@media (max-width:1024px)`] = {
      fontSize: pxToRem(md)
    };
  }

  return sizes;
};
