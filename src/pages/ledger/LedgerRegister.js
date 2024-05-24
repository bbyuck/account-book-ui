import { IconButton } from "@mui/material";
import Page from "components/Page";
import { useNavigate } from "react-router";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from "components/input/DatePicker";
import MoneyInput from "components/input/MoneyInput";
import DescriptionInput from "components/input/DescriptionInput";
import LedgerCodeSelect from "components/input/LedgerCodeSelect";

export default function LedgerRegister() {
  const navigate = useNavigate();
  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const headerInfo = {
    left: (
      <IconButton
        onTouchEnd={() => {
          navigate(-1);
        }}
      >
        <NavigateBeforeIcon />
      </IconButton>
    ),
    center: <h2>가계부 입력</h2>,
  };

  /**
   * ================= 금액 ===================
   */

  const [amount, setAmount] = useState("0");

  /**
   * ================= 금액 ===================
   */

  /**
   * ================= 가계부 코드 버튼 ===================
   */
  const [ledgerCode, setLedgerCode] = useState();

  /**
   * ================= 가계부 코드 버튼 ===================
   */

  /**
   * ================= 설명 ===================
   */

  const [description, setDescription] = useState();

  /**
   * ================= 설명 ===================
   */

  return (
    <Page headerInfo={headerInfo}>
      <DatePicker
        label={"날짜"}
        year={selectedDate.year}
        month={selectedDate.month}
        day={selectedDate.day}
        dayName={selectedDate.dayName}
        disabled
      />

      <MoneyInput
        style={{ marginTop: "20px" }}
        value={amount}
        label={"금액을 입력해주세요."}
        onChange={setAmount}
        max={100000000}
      />

      <DescriptionInput
        label={"상세 내역을 입력해주세요."}
        style={{ marginTop: "20px" }}
        value={description}
        onChange={setDescription}
      />

      <LedgerCodeSelect
        style={{ marginTop: "20px" }}
        value={ledgerCode}
        onSelect={setLedgerCode}
      />
    </Page>
  );
}
