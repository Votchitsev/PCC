export const comparePassword = (password1: string, password2: string) => {
  return password1 === password2;
};

export const isEmpty = (value: number | string): boolean => {
  if (typeof value === 'number') {
    return value === null;
  }

  if (typeof value === 'string') {
    return value.length === 0;
  }

  return true;
};
