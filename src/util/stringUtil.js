export const getByteLength = (str) => {
  const encoder = new TextEncoder();
  const byteArray = encoder.encode(str);
  console.log(byteArray.length);
  return byteArray.length;
};
