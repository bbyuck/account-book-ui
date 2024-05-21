import { useCallback, useEffect, useMemo, useState } from "react";
import "components/style/LedgerCalendar.css";

export default function LedgerCalendar(props) {
  /**
   * props
   */
  const {
    year,
    month,
    ledgers,
    selectedDate,
    onDateSelect,
    touchingDate,
    onDateTouching,
    swiping,
  } = props;
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

  /**
   * ============== event handler ==============
   */
  const selectDate = ({ day, isHoliday, nameOfTheDay, week }) => {
    if (day === null) {
      onDateSelect(undefined);
      return;
    }
    onDateSelect(day);
  };

  const touchDate = ({ day, isHoliday, nameOfTheDay, week }) => {
    if (day === null) {
      onDateTouching(undefined);
      return;
    }
    onDateTouching(day);
  };

  const touchDateEnd = useCallback(() => {
    onDateTouching(undefined);
  }, [onDateTouching]);

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

  useEffect(() => {
    if (swiping) {
      touchDateEnd();
    }
  }, [swiping, touchDateEnd]);

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
                    className={`calendar-date-cell${
                      selectedDate === day.day
                        ? " calendar-date-cell-selected"
                        : ""
                    }`}
                    onTouchStart={() => {
                      touchDate(day);
                    }}
                    onTouchEnd={() => {
                      if (!swiping) {
                        touchDateEnd();
                        selectDate(day);
                      }
                    }}
                    key={`calendar-day-of-${weekIndex}-${dayIndex}`}
                  >
                    <div
                      className={`${
                        day.nameOfTheDay === "일"
                          ? "calendar-date-cell-holiday"
                          : ""
                      }${
                        touchingDate === day.day
                          ? " calendar-date-cell-touching"
                          : ""
                      }`}
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
