import { Avatar, Box, Grid, IconButton, TextField } from "@mui/material";
import Page from "components/Page";
import { useNavigate } from "react-router";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import MoneyIcon from "@mui/icons-material/Money";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import DescriptionIcon from "@mui/icons-material/Description";

import { useSelector } from "react-redux";
import { useState } from "react";

export default function LedgerRegister() {
  const navigate = useNavigate();
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
    center: <h2>가계부 입력</h2>,
  };

  /**
   * ================= 금액 ===================
   */

  const [amount, setAmount] = useState("0");

  /**
   * 왼쪽의 모든 0을 제거
   * @param {String} str
   * @returns
   */
  const removeAllLeadingZero = (str) => {
    return str.replace(/^0+/, "");
  };

  const getNumberValue = (str) => {
    return Number(str.replace(/,/g, ""));
  };

  const numericInput = (e) => {
    if (e.key === "Backspace") {
      setAmount(
        getNumberValue(
          removeAllLeadingZero(amount.slice(0, -1))
        ).toLocaleString()
      );
    } else if (e.key < "0" || e.key > "9") {
      return;
    } else {
      if (String(getNumberValue(amount)).length > 8) {
        alert("금액은 999,999,999 미만으로 입력해야 합니다.");
        return;
      }

      setAmount(
        getNumberValue(removeAllLeadingZero(amount + e.key)).toLocaleString()
      );
    }
  };
  /**
   * ================= 금액 ===================
   */

  /**
   * ================= 가계부 코드 버튼 ===================
   */

  const ledgerCodes = [
    {
      icon: <AccountBalanceIcon />,
      value: "S",
      label: "저축",
    },
    {
      icon: <AttachMoneyIcon />,
      value: "I",
      label: "수입",
    },
    {
      icon: <MoneyOffIcon />,
      value: "E",
      label: "지출",
    },
  ];

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
      <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: "20px" }}>
        <CalendarMonthIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          sx={{ mr: 2, width: "100%" }}
          disabled
          label="날짜"
          value={`${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일 (${selectedDate.dayName}요일)`}
          variant="standard"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: "20px" }}>
        <MoneyIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          sx={{ mr: 2, width: "100%" }}
          variant="standard"
          type="text"
          value={amount}
          label="금액을 입력해주세요."
          inputMode="numeric"
          onKeyDown={(e) => numericInput(e)}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: "20px" }}>
        <DescriptionIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          sx={{ mr: 2, width: "100%" }}
          variant="standard"
          label={"상세 내역을 입력해주세요."}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
        <Grid container spacing={2}>
          {ledgerCodes.map((ledgerCode, index) => (
            <Grid item xs={4} key={`ledger-code-${ledgerCode.value}`}>
              <IconButton>
                <Avatar>{ledgerCode.icon}</Avatar>
              </IconButton>
              <div>{ledgerCode.label}</div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Page>
  );
}
