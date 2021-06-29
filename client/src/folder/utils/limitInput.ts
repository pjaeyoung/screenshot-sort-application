const convertStringToByte = (string: string): number => {
  return string
    .split('')
    .reduce((acc: number, cur: string) => (cur.charCodeAt(0) > 128 ? acc + 2 : acc + 1), 0);
};

export const overTextLength12 = (text: string): boolean => convertStringToByte(text) > 12;
