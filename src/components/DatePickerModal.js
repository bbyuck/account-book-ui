import React, { useState } from "react";
// import DatePicker from "react-native-date-picker";

export default function DatePickerModal({ open, onOpen }) {
  const [date, setDate] = useState(new Date());

  return (
    <>
      {/* <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          onOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          onOpen(false);
        }}
      /> */}
    </>
  );
}
