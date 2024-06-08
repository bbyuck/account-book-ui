import { IconButton } from "@mui/material";
import Page from "components/Page";
import { useNavigate, useParams } from "react-router";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "components/style/TextField.css";
import http from "api";
import MoneyInput from "components/input/MoneyInput";
import DatePicker from "components/input/DatePicker";
import DescriptionInput from "components/input/DescriptionInput";
import LedgerCodeSelect from "components/input/LedgerCodeSelect";
import { setPageTransition } from "store/slice/clientInfo";
import { setSelectedDetailDate } from "store/slice/ledgerInfo";
import { convertToLocalDateFormat } from "util/calendarUtil";
import { fromLocaleStringToNumber } from "util/numberUtil";

export default function LedgerUpdate() {
  const navigate = useNavigate();
  const { ledgerId } = useParams();
  // testData
  const dispatch = useDispatch();
  const { selectedDate, selectedDetailDate } = useSelector(
    (state) => state.ledgerInfo
  );
  useEffect(() => {
    dispatch(setSelectedDetailDate(selectedDate));
  }, [dispatch]);

  useEffect(() => {
    if (!ledgerId) {
      alert("잘못된 접근입니다.");
      sessionStorage.setItem("buttonBack", true);
      navigate(-1, {
        replace: true,
      });
    }

    const apiUrl = `/api/v1/ledger/${ledgerId}`;
    http
      .get(apiUrl)
      .then((response) => {
        setAmount(response.data.data.ledgerAmount.toLocaleString());
        setDescription(response.data.data.ledgerDescription);
        setLedgerCode(response.data.data.ledgerCode);
      })
      .catch((e) => {
        console.log(e);
      });

    /**
     * TODO ledger detail get
     */
  }, [ledgerId, navigate, dispatch]);

  const updateLedger = () => {
    if (fromLocaleStringToNumber(amount) === 0) {
      alert("가계부 금액은 0원 이상이어야 합니다.");
      return;
    }

    const param = {
      ledgerDate: convertToLocalDateFormat(selectedDetailDate),
      ledgerCode: ledgerCode,
      ledgerAmount: fromLocaleStringToNumber(amount),
      ledgerDescription: description,
    };
    http
      .put(`/api/v1/ledger/${ledgerId}`, param)
      .then((response) => {
        sessionStorage.setItem("buttonBack", true);
        navigate(-1, {
          replace: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const headerInfo = {
    left: (
      <IconButton
        onTouchEnd={() => {
          sessionStorage.setItem("buttonBack", true);
          navigate(-1, {
            replace: true,
          });
        }}
      >
        <NavigateBeforeIcon />
      </IconButton>
    ),
    right: (
      <IconButton onTouchEnd={updateLedger}>
        <AssignmentTurnedInIcon />
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
        selectedDate={selectedDetailDate}
        selectDate={(pickedDate) => {
          dispatch(setSelectedDetailDate(pickedDate));
        }}
        pickerOpen={datePickerOpen}
        setPickerOpen={setDatePickerOpen}
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
