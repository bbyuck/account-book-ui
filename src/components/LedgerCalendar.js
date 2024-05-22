import { useCallback, useEffect, useMemo, useState } from "react";
import { getLastDayOfTheMonth } from "util/calendarUtil";
import "components/style/LedgerCalendar.css";
import { namesOfDay } from "store/slice/ledgerInfo";

export default function LedgerCalendar(props) {
  /**
   * props
   */
  const {
    year,
    month,
    ledgers,
    selectedDay,
    onDaySelect,
    touchingDate,
    onDateTouching,
    swiping,
    selected,
  } = props;

  /**
   * ============== util methods ==============
   */

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
  const selectDay = ({ day, isHoliday, nameOfTheDay, week }) => {
    if (!day) {
      return;
    }
    onDaySelect(day);
  };

  const touchDate = ({ day, isHoliday, nameOfTheDay, week }) => {
    if (!day) {
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
          day: undefined,
          nameOfTheDay: namesOfDay[i % 7],
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
  }, [month, year]);

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
            {namesOfDay.map((nameOfTheDay, index) => (
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
                      selectedDay === day.day && selected
                        ? " calendar-date-cell-selected"
                        : ""
                    }`}
                    onTouchStart={() => {
                      touchDate(day);
                    }}
                    onTouchEnd={() => {
                      if (!swiping) {
                        touchDateEnd();
                        selectDay(day);
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
