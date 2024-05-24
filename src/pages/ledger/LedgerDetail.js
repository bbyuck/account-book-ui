import { IconButton } from "@mui/material";
import Page from "components/Page";
import { useNavigate, useParams } from "react-router";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "components/style/TextField.css";
import http from "api";
import MoneyInput from "components/input/MoneyInput";
import DatePicker from "components/input/DatePicker";
import DescriptionInput from "components/input/DescriptionInput";
import LedgerCodeSelect from "components/input/LedgerCodeSelect";

export default function LedgerUpdate() {
  const navigate = useNavigate();
  const { ledgerId } = useParams();
  // testData
  const coupleId = 1;

  const [ledger, setLedger] = useState();

  useEffect(() => {
    if (!ledgerId) {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }

    if (coupleId) {
      const params = {
        ci: coupleId,
      };
      http
        .get(`/api/v1/couple/ledger/${ledgerId}`, { params })
        .then((response) => {
          setLedger(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      http
        .get(`/api/v1/personal/ledger/${ledgerId}`)
        .then((response) => {
          setLedger(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    /**
     * TODO ledger detail get
     */
  }, [ledgerId, navigate]);

  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const headerInfo = {
    left: (
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <NavigateBeforeIcon />
      </IconButton>
    ),
  };

  /**
   * ================= 날짜 ===================
   */
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  /**
   * ================= 날짜 ===================
   */

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
      />

      <MoneyInput
        style={{ marginTop: "20px" }}
        value={amount}
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
