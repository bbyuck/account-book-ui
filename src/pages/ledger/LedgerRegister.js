import { IconButton } from "@mui/material";
import Page from "components/Page";
import { useNavigate } from "react-router";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DatePicker from "components/input/DatePicker";
import MoneyInput from "components/input/MoneyInput";
import DescriptionInput from "components/input/DescriptionInput";
import LedgerCodeSelect from "components/input/LedgerCodeSelect";
import { fromLocaleStringToNumber } from "util/numberUtil";

import http from "api";

export default function LedgerRegister() {
  const navigate = useNavigate();
  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const [requiredInputCompleted, setRequiredInputCompleted] = useState(false);

  const headerInfo = {
    left: (
      <IconButton
        onTouchEnd={() => {
          navigate(-1, { state: { pop: true } });
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

  /**
   * 필수 입력 조건
   */
  useEffect(() => {
    setRequiredInputCompleted(ledgerCode ? true : false);
  }, [ledgerCode]);

  /**
   * 필수 입력 조건 모두 입력시 저장
   */
  useEffect(() => {
    if (requiredInputCompleted) {
      // TODO insert API call

      const params = {
        ledgerDate: `${selectedDate.year}-${String(selectedDate.month).padStart(
          2,
          "0"
        )}-${String(selectedDate.day).padStart(2, "0")}`,
        ledgerCode: ledgerCode,
        ledgerAmount: fromLocaleStringToNumber(amount),
        ledgerDescription: description,
      };

      http
        .post("/api/v1/ledger", params)
        .then((response) => {
          console.log(response);
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [requiredInputCompleted]);

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
