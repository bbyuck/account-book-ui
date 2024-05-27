import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";
import { getLastDayOfTheMonth } from "util/calendarUtil";

// const selections = {
//   title: ["Mr.", "Mrs.", "Ms.", "Dr."],
//   firstName: ["John", "Micheal", "Elizabeth"],
//   lastName: ["Lennon", "Jackson", "Jordan", "Legend", "Taylor"],
// };

export default function DatePickerModal() {
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();
  const yearArrange = 3;
  const lastDayOfThisMonth = getLastDayOfTheMonth(thisYear, thisMonth);

  const calendarYear = Array.from(
    { length: 2 * yearArrange + 1 },
    (_, index) => thisYear - yearArrange + index
  );
  const calendarMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [calendar, setCalendar] = useState({
    year: calendarYear,
    month: calendarMonth,
    day: Array.from(
      { length: lastDayOfThisMonth.getDate() },
      (_, index) => 1 + index
    ),
  });
  const [pickedDate, setPickedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  });

  useEffect(() => {
    const lastDayOfPickedMonth = getLastDayOfTheMonth(
      pickedDate.year,
      pickedDate.month
    );
    setCalendar({
      year: calendarYear,
      month: calendarMonth,
      day: Array.from(
        { length: lastDayOfPickedMonth.getDate() },
        (_, index) => 1 + index
      ),
    });
    if (pickedDate.day > lastDayOfPickedMonth.getDate()) {
      setPickedDate({
        year: pickedDate.year,
        month: pickedDate.month,
        day: lastDayOfPickedMonth.getDate(),
      });
    }
  }, [pickedDate]);

  return (
    <Picker value={pickedDate} onChange={setPickedDate}>
      {Object.keys(calendar).map((name) => (
        <Picker.Column key={name} name={name}>
          {calendar[name].map((option) => (
            <Picker.Item key={option} value={option}>
              {option}
            </Picker.Item>
          ))}
        </Picker.Column>
      ))}
    </Picker>
  );
}
