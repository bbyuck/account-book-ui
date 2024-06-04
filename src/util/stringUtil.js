export const getByteLength = (str) => {
  const encoder = new TextEncoder();
  const byteArray = encoder.encode(str);
  return byteArray.length;
};
