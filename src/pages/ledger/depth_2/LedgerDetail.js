import { Fab, IconButton, Zoom } from "@mui/material";
import Page from "components/Page";
import { useNavigate, useParams } from "react-router";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "components/style/TextField.css";
import api from "api";
import MoneyInput from "components/input/MoneyInput";
import DatePicker from "components/input/DatePicker";
import DescriptionInput from "components/input/DescriptionInput";
import LedgerCodeSelect from "components/input/LedgerCodeSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { setSelectedDetailDate } from "store/slice/ledgerInfo";
import { convertToLocalDateFormat } from "util/calendarUtil";
import { fromLocaleStringToNumber } from "util/numberUtil";
import {
  closeConfirm,
  openConfirm,
  setPageTransition,
} from "store/slice/clientInfo";
import HeaderBackButton from "components/input/HeaderBackButton";

export default function LedgerDetail() {
  const navigate = useNavigate();
  const { ledgerId } = useParams();
  // testData
  const dispatch = useDispatch();
  const { selectedDate, selectedDetailDate } = useSelector(
    (state) => state.ledgerInfo
  );
  const { confirm } = useSelector((state) => state.clientInfo);

  useEffect(() => {
    dispatch(setSelectedDetailDate(selectedDate));
  }, [dispatch]);

  useEffect(() => {
    if (!ledgerId) {
      alert("잘못된 접근입니다.");
      sessionStorage.setItem("buttonBack", true);
      dispatch(setPageTransition("pop"));
      navigate("/app/ledger", {
        replace: true,
      });
    }

    const apiUrl = `/api/v1/ledger/${ledgerId}`;
    api
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
    api
      .put(`/api/v1/ledger/${ledgerId}`, param)
      .then((response) => {
        sessionStorage.setItem("buttonBack", true);
        dispatch(setPageTransition("pop"));
        navigate("/app/ledger", {
          replace: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteButtonClickHandler = () => {
    dispatch(
      openConfirm({
        title: "삭제하시겠습니까?",
        message: "삭제된 가계부는 복구할 수 없습니다.",
        confirmLabel: "삭제",
        cancelLabel: "취소",
        onConfirmed: () => {
          deleteLedger();
          dispatch(closeConfirm());

          return true;
        },
      })
    );
  };

  const deleteLedger = () => {
    api
      .delete(`/api/v1/ledger/${ledgerId}`)
      .then((response) => {
        if (response.data.data.success) {
          dispatch(setPageTransition("pop"));
          navigate("/app/ledger", {
            replace: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const headerInfo = {
    left: <HeaderBackButton />,
    right: (
      <IconButton onClick={updateLedger}>
        <AssignmentTurnedInIcon color={"primary"} />
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

  const [description, setDescription] = useState("");

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

      <Zoom
        in={true}
        timeout={200}
        style={{
          transitionDelay: "200ms",
        }}
        unmountOnExit
      >
        <Fab
          sx={{
            position: "absolute",
            bottom: 25,
            right: 25,
          }}
          aria-label={"Delete"}
          color="error"
          onClick={deleteButtonClickHandler}
        >
          <DeleteIcon />
        </Fab>
      </Zoom>
    </Page>
  );
}
