import Page from "components/page/index";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DatePicker from "components/input/date-picker";
import MoneyInput from "components/input/money";
import DescriptionInput from "components/input/description";
import LedgerCodeSelect from "components/input/ledger-code-select";
import { fromLocaleStringToNumber } from "util/numberUtil";

import api from "api";
import { setPageTransition } from "store/slice/clientInfo";
import { convertToLocalDateFormat } from "util/calendarUtil";
import HeaderBackButton from "components/header/back-button";
import CategoryGrid from "components/category-grid";
import { Box, Paper } from "@mui/material";
import HeaderDoneButton from "components/header/done-button";

export default function LedgerRegister() {
  const navigate = useNavigate();
  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const { categories, customColor } = useSelector((state) => state.userInfo);
  const [requiredInputCompleted, setRequiredInputCompleted] = useState(false);
  const dispatch = useDispatch();

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
  const [ledgerCategoryButtons, setLedgerCategoryButtons] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const insertLedger = () => {
    if (requiredInputCompleted) {
      // TODO insert API call

      if (fromLocaleStringToNumber(amount) === 0) {
        setLedgerCode(null);
        setRequiredInputCompleted(false);

        alert("가계부 금액은 0원 이상이어야 합니다.");
        return;
      }

      const params = {
        ledgerDate: convertToLocalDateFormat(selectedDate),
        ledgerCode: ledgerCode,
        ledgerAmount: fromLocaleStringToNumber(amount),
        ledgerDescription: description,
        ledgerCategoryId: selectedCategoryId,
      };

      api
        .post("/api/v1/ledger", params)
        .then((response) => {
          sessionStorage.setItem("buttonBack", true);
          dispatch(setPageTransition("pop"));
          navigate(-1);
        })
        .catch((error) => {});
    }
  };

  const headerInfo = {
    left: <HeaderBackButton />,
    center: "가계부 입력",
    right: (
      <HeaderDoneButton
        onClick={insertLedger}
        complete={requiredInputCompleted}
      />
    ),
  };

  /**
   * 필수 입력 조건
   */
  useEffect(() => {
    setRequiredInputCompleted(
      ledgerCode && fromLocaleStringToNumber(amount) > 0
    );
  }, [ledgerCode, amount]);

  const addButton = {
    id: null,
    iconName: "plus",
    name: "추가",
    ledgerCode: "NONE",
    fill: `#${customColor.value}`,
    action: () => {
      goForward("/app/setting/ledger/category/add");
    },
  };

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  useEffect(() => {
    setLedgerCategoryButtons(
      categories.value
        .filter((category) => category.ledgerCode === ledgerCode)
        .map((category) => {
          const categoryButton = {
            id: category.ledgerCategoryId,
            iconName: category.iconName,
            ledgerCode: category.ledgerCode,
            name: category.ledgerCategoryName,
            action: () => setSelectedCategoryId(category.ledgerCategoryId),
          };
          return categoryButton;
        })
        .concat(addButton)
    );
  }, [categories, ledgerCode]);

  return (
    <Page headerInfo={headerInfo}>
      <Paper
        elevation={5}
        sx={{
          paddingBottom: "25px",
          width: "100vw",
          position: "fixed",
          backgroundColor: "#fff",
          zIndex: 2,
        }}
      >
        <DatePicker label={"날짜"} selectedDate={selectedDate} disabled />

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
          onSelect={(newValue) => {
            setLedgerCode(newValue === ledgerCode ? null : newValue);
            setSelectedCategoryId(null);
          }}
        />
      </Paper>

      <Box sx={{ position: "relative", marginTop: "350px" }}>
        <CategoryGrid
          categories={ledgerCategoryButtons}
          selected={selectedCategoryId}
        />
      </Box>
    </Page>
  );
}
