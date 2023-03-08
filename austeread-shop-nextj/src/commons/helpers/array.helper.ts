export const deepFreeze = (obj: any) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object") deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};
