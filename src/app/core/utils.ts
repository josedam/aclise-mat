export const toCapitalLeters = (s: string): string => {
  return s
    .split(' ')
    .map((p) => p.charAt(0).toUpperCase() + p.substr(1))
    .join(' ');
};
