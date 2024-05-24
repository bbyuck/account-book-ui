/**
 * 123,456,789 과 같이 LocaleString 형태의 숫자 String input을 ,를 제거한 Number type으로 리턴
 * @param {String} str
 * @returns
 */
export const fromLocaleStringToNumber = (str) => {
  return Number(str.replace(/,/g, ""));
};

/**
 * 왼쪽의 모든 0을 제거
 * @param {String} str
 * @returns
 */
export const removeAllLeadingZero = (str) => {
  return str.replace(/^0+/, "");
};
