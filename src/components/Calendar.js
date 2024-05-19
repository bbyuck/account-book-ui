import { useEffect, useMemo, useState } from "react";
import "style/Calendar.css";

export default function Calendar(props) {
  /**
   * props
   */
  const { year, month, ledgers } = props;
  const daysOfTheWeek = useMemo(
    () => ["일", "월", "화", "수", "목", "금", "토"],
    []
  );

  /**
   * ============== util methods ==============
   */

  /**
   * year-month인 달의 마지막 날 Date객체 리턴
   * @param {Number} year
   * @param {Number} month
   * @returns {Date} lastDayOfTheMonth
   */
  const getLastDayOfTheMonth = (year, month) => {
    // 1. date 객체에서 month + 1
    const lastDate = new Date(year, month);
    lastDate.setMonth(lastDate.getMonth() + 1);
    lastDate.setDate(lastDate.getDate() - 1);
    return lastDate;
  };

  /**
   * 첫째날의 달력상의 index, 마지막 날의 date로 렌더링할 달력의 마지막 주를 계산해 리턴
   * @param {Date} firstDay
   * @param {Date} lastDay
   * @returns
   */
  const getMaxWeek = (firstDay, lastDay) => {
    return Math.floor((firstDay.getDay() + lastDay.getDate()) / 7);
  };

  /**
   * ============== state ==============
   */
  const [calendarInfo, setCalendarInfo] = useState({
    data: [],
    weeks: Number,
  });
  const [selectedDate, setSelectedDate] = useState();

  /**
   * ============== event handler ==============
   */
  const selectDate = ({ day, isHoliday, nameOfTheDay, week }) => {
    if (day === null) {
      setSelectedDate(undefined);
      return;
    }
    setSelectedDate(day);
  };

  /**
   * ============== useEffet ==============
   */
  useEffect(() => {
    const getCalendarInfo = () => {
      const firstDayOfTargetMonth = new Date(year, month - 1);
      const lastDayOfTheTargetMonth = getLastDayOfTheMonth(year, month);

      const firstDayIdx = firstDayOfTargetMonth.getDay();
      const lastRow = getMaxWeek(
        firstDayOfTargetMonth,
        lastDayOfTheTargetMonth
      );

      const calendarInfo = {
        data: [],
        weeks: lastRow + 1,
      };

      let day = 1;
      let week;

      for (let i = 0; i < (lastRow + 1) * 7; i++) {
        if (i % 7 === 0) {
          week = [];
        }

        const cell = {
          day: null,
          nameOfTheDay: daysOfTheWeek[i % 7],
          week: Math.floor(i / 7) + 1,
          isHoliday: false,
        };

        if (!(i < firstDayIdx || lastDayOfTheTargetMonth.getDate() < day)) {
          cell.day = day++;
        }
        week.push(cell);

        if ((i + 1) % 7 === 0) {
          calendarInfo.data.push(week);
        }
      }

      return calendarInfo;
    };

    setCalendarInfo(getCalendarInfo());
  }, [daysOfTheWeek, month, year]);

  return (
    <>
      <table className="calendar-wrapper">
        <thead>
          <tr className="calendar-day-name-of-the-week">
            {daysOfTheWeek.map((nameOfTheDay, index) => (
              <th key={`day-of-the-week-${index}`}>{nameOfTheDay}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarInfo.data.map((week, weekIndex) => (
            <tr
              className="calendar-date-row"
              key={`calendar-week-of-${weekIndex}`}
            >
              {week.map((day, dayIndex) => {
                return (
                  <td
                    className={"calendar-date-cell"}
                    onClick={() => {
                      selectDate(day);
                    }}
                    style={{
                      backgroundColor:
                        selectedDate === day.day ? "#fefd48" : "transparent",
                    }}
                    key={`calendar-day-of-${weekIndex}-${dayIndex}`}
                  >
                    <div
                      style={{
                        color:
                          day.nameOfTheDay === "일" || day.isHoliday
                            ? "red"
                            : "black",
                      }}
                    >
                      {day.day}
                    </div>
                    <div className="calendar-income calendar-money">
                      {ledgers[day.day] && ledgers[day.day].dailyIncome
                        ? `+${ledgers[day.day].dailyIncome.toLocaleString()}`
                        : null}
                    </div>
                    <div className="calendar-expenditure calendar-money">
                      {ledgers[day.day] && ledgers[day.day].dailyExpenditure
                        ? `-${ledgers[
                            day.day
                          ].dailyExpenditure.toLocaleString()}`
                        : null}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
