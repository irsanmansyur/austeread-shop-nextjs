export const urlAsset = (path: string): string => {
  return `https://austeread.com/assets/${path}`;
};

export const lastId = (prefix = "id") => {
  return `${prefix}${new Date().getTime()}`;
};
