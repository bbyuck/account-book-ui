import { Avatar, Box, Grid, IconButton, TextField } from "@mui/material";
import Page from "components/Page";
import { useNavigate, useParams } from "react-router";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import DescriptionIcon from "@mui/icons-material/Description";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "components/style/TextField.css";
import http from "api";
import DatePickerModal from "components/DatePickerModal";
import MoneyInput from "components/input/MoneyInput";

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
      <DatePickerModal open={datePickerOpen} onOpen={setDatePickerOpen} />
      <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: "20px" }}>
        <CalendarMonthIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          sx={{ mr: 2, width: "100%" }}
          label="날짜"
          className="disabled-textfield-button"
          disabled
          value={`${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일 (${selectedDate.dayName}요일)`}
          variant="standard"
        />
      </Box>

      <MoneyInput
        style={{ marginTop: "20px" }}
        value={amount}
        onChange={setAmount}
        max={100000000}
      />

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
