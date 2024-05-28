import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import Picker from "react-mobile-picker";
import { getLastDayOfTheMonth } from "util/calendarUtil";
import "components/style/DatePickerModal.css";

export default function DatePickerModal({
  open,
  onClose,
  selectedDate,
  selectDate,
}) {
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();
  const yearArrange = 3;
  const lastDayOfThisMonth = getLastDayOfTheMonth(thisYear, thisMonth);

  const [pickedDate, setPickedDate] = useState(selectedDate);
  useEffect(() => {
    setPickedDate(selectedDate);
  }, [selectedDate]);

  const handleSelectConfirmButton = () => {
    selectDate(pickedDate);
    onClose();
  };
  const handleSelectCancelButton = () => {
    setPickedDate(selectedDate);
    onClose();
  };

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
    if (selectedDate.day > lastDayOfPickedMonth.getDate()) {
      setPickedDate({
        year: selectedDate.year,
        month: selectedDate.month,
        day: lastDayOfPickedMonth.getDate(),
      });
    }
  }, [pickedDate]);
  return (
    <Modal open={open} onClose={() => onClose}>
      <Box
        sx={{
          position: "fixed",
          bottom: "6vw",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          ":focus": { outline: "none" },
        }}
      >
        <Box
          sx={{
            zIndex: "1",
            width: "94%",
            borderRadius: 2,
            bgcolor: "background.default",
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr" },
            textAlign: "center",
          }}
        >
          <div style={{ position: "absolute", left: "15px" }}>
            <Button sx={{ padding: 0 }} onTouchEnd={handleSelectCancelButton}>
              <h3>취소</h3>
            </Button>
          </div>
          <h3>날짜 선택</h3>
          <div style={{ position: "absolute", right: "15px" }}>
            <Button sx={{ padding: 0 }} onTouchEnd={handleSelectConfirmButton}>
              <h3>확인</h3>
            </Button>
          </div>
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
        </Box>
      </Box>
    </Modal>
  );
  // return <Modal ></Modal>;
}
