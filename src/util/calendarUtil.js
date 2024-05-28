/**
 * year-month인 달의 마지막 날 Date객체 리턴
 * @param {Number} year
 * @param {Number} month
 * @returns {Date} lastDayOfTheMonth
 */
const getLastDayOfTheMonth = (year, month) => {
  // 1. date 객체에서 month + 1
  const lastDate = new Date(year, month);
  lastDate.setMonth(lastDate.getMonth());
  lastDate.setDate(lastDate.getDate() - 1);
  return lastDate;
};

const convertToLocalDateFormat = ({ year, month, day }) => {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};

export { getLastDayOfTheMonth, convertToLocalDateFormat };
