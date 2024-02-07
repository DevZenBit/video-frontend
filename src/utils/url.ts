export const generateUrlWithQueryParams = (
  url: string,
  fields: { [key: string]: string | number | boolean | number[] | string[] | undefined | null } = {}
): string => {
  let isFirst = true;

  return Object.keys(fields).reduce<string>((acc, value) => {
    const val = fields[value];

    if (typeof val === 'undefined' || val === null) return acc;

    const newUrl = `${isFirst ? '?' : '&'}${value}=${Array.isArray(val) ? JSON.stringify(val) : val}`;

    isFirst = false;

    return acc.concat(newUrl);
  }, url);
};
