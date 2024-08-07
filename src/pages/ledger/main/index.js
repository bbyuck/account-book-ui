import LedgerCalendarCarousel from "components/calendar/ledger-carousel";
import { useEffect, useState } from "react";
import { IconButton, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Page from "components/page/index";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "store/slice/ledgerInfo";
import api from "api";
import LedgerDailyList from "components/ledger-daily-list";
import { setPageTransition } from "store/slice/clientInfo";
// import SettingsIcon from "@mui/icons-material/Settings";
import GridViewIcon from "@mui/icons-material/GridView";
import WcIcon from "@mui/icons-material/Wc";
import BoyIcon from "@mui/icons-material/Boy";
import DonutLargeTwoToneIcon from "@mui/icons-material/DonutLargeTwoTone";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import HeaderAddButton from "components/header/add-button";
import EqualizerSharpIcon from "@mui/icons-material/EqualizerSharp";
import { convertToYearMonth } from "util/calendarUtil";
import GradientIcon from "components/icon/gradient";

export default function LedgerMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const { couple } = useSelector((state) => state.userInfo);

  const [pageInit, setPageInit] = useState(true);
  const [monthlyData, setMonthlyData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
  });
  const [selectedDay, setSelectedDay] = useState(selectedDate.day);
  const [target, setTarget] = useState("NONE");

  const findMonthlyLedger = (changeTo) => {
    const defaultApiUrl = "/api/v1/monthly/ledger";
    const coupleApiUrl = "/api/v1/monthly/couple/ledger";
    const personalApiUrl = "/api/v1/monthly/personal/ledger";

    let apiUrl = defaultApiUrl;

    if (changeTo) {
      apiUrl = changeTo === "COUPLE" ? coupleApiUrl : personalApiUrl;
      setTarget(changeTo);
    } else {
      apiUrl =
        target === "COUPLE"
          ? coupleApiUrl
          : target === "PERSONAL"
          ? personalApiUrl
          : apiUrl;
    }

    /* TODO -> 월별 가계부 조회 API 호출 */
    const params = {
      ym: convertToYearMonth(selectedMonth),
    };
    api
      .get(apiUrl, { params })
      .then((response) => {
        setMonthlyData(response.data.data);
      })
      .catch((e) => {
        setMonthlyData(null);
      })
      .finally(() => {
        document.getElementById("page-contents-wrapper").scroll(0, 0);
      });
  };

  useEffect(() => {
    if (couple.coupleStatus === "ACTIVE") {
      setTarget("COUPLE");
    } else {
      setTarget("NONE");
    }
  }, [couple]);

  useEffect(() => {
    if (!pageInit) {
      findMonthlyLedger();
    }
    setPageInit(false);
  }, [selectedMonth, pageInit]);

  useEffect(() => {
    // selectedDate update
    dispatch(
      setSelectedDate({
        year: selectedMonth.year,
        month: selectedMonth.month,
        day: selectedDay,
      })
    );
  }, [dispatch, selectedMonth, selectedDay]);

  /**
   * navigate methods
   */

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  const coupleButtonOnClickHandler = () => {
    if (couple.coupleStatus === "ACTIVE") {
      // target기반 요청
      findMonthlyLedger(target === "COUPLE" ? "PERSONAL" : "COUPLE");
    } else {
      // connect page로
      goForward("/app/couple/connect");
    }
  };

  const headerInfo = {
    left: (
      <>
        <IconButton onClick={() => goForward("/app/menu")}>
          <GridViewIcon />
        </IconButton>
        <IconButton onClick={() => goForward("/app/ledger/annual/statistic")}>
          <GradientIcon
            id="gradient-equalizer-icon"
            icon={EqualizerSharpIcon}
            leftBottomColor="#4285F4" // Blue
            rightTopColor="#EA4335" // Red
          />
        </IconButton>
        <IconButton onClick={() => goForward("/app/ledger/monthly/statistic")}>
          <GradientIcon
            id="gradient-donut-icon"
            icon={DonutLargeTwoToneIcon}
            leftBottomColor="blue" // Blue
            rightTopColor="red" // Red
          />
        </IconButton>
      </>
    ),
    center: `${selectedMonth.year}년 ${selectedMonth.month}월`,
    right: (
      <>
        <IconButton onClick={coupleButtonOnClickHandler}>
          {target === "PERSONAL" ? (
            <BoyIcon color="primary" />
          ) : target === "COUPLE" ? (
            <WcIcon color="primary" />
          ) : (
            <FavoriteRoundedIcon color="primary" />
          )}
        </IconButton>

        <HeaderAddButton targetPage={"/app/ledger/register"} />
      </>
    ),
  };

  return (
    <Page headerInfo={headerInfo}>
      <LedgerCalendarCarousel
        monthlyData={monthlyData}
        selectedMonth={selectedMonth}
        onMonthSelect={setSelectedMonth}
        selectedDay={selectedDay}
        onDaySelect={setSelectedDay}
      />
      <LedgerDailyList
        ledgers={
          monthlyData &&
          monthlyData.ledgersPerDay &&
          monthlyData.ledgersPerDay[selectedDay] &&
          monthlyData.ledgersPerDay[selectedDay].ledgers
            ? monthlyData.ledgersPerDay[selectedDay].ledgers
            : []
        }
        onItemSelect={(ledgerId) => goForward(`/app/ledger/modify/${ledgerId}`)}
      />
    </Page>
  );
}
