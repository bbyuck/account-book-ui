import LedgerCalendarCarousel from "components/LedgerCalendarCarousel";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Page from "components/Page";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "store/slice/ledgerInfo";
import api from "api";
import LedgerDailyList from "components/LedgerDailyList";
import { setPageTransition } from "store/slice/clientInfo";
// import SettingsIcon from "@mui/icons-material/Settings";
import GridViewIcon from "@mui/icons-material/GridView";
import WcIcon from "@mui/icons-material/Wc";
import BoyIcon from "@mui/icons-material/Boy";

export default function LedgerMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const { coupleStatus } = useSelector((state) => state.userInfo);

  const [pageInit, setPageInit] = useState(true);
  const [monthlyData, setMonthlyData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
  });
  const [selectedDay, setSelectedDay] = useState(selectedDate.day);
  const [target, setTarget] = useState(
    coupleStatus === "ACTIVE" ? "COUPLE" : "NONE"
  );

  const findMonthlyLedger = (changeTo) => {
    let apiUrl = `/api/v1/monthly/ledger`;

    // if (changeTo) {
    //   apiUrl =
    //     changeTo === "COUPLE"
    //       ? `/api/v1/monthly/couple/ledger`
    //       : `/api/v1/monthly/personal/ledger`;
    //   setTarget(changeTo);
    // }

    setMonthlyData(null);
    /* TODO -> 월별 가계부 조회 API 호출 */
    const params = {
      ym: `${selectedMonth.year}${String(selectedMonth.month).padStart(
        2,
        "0"
      )}`,
    };
    api
      .get(apiUrl, { params })
      .then((response) => {
        setMonthlyData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        document.getElementById("page-contents-wrapper").scroll(0, 0);
      });
  };

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

  const headerInfo = {
    left: (
      <IconButton>
        <GridViewIcon onClick={() => goForward("/app/menu")} />
      </IconButton>
    ),
    center: <h2>{`${selectedMonth.year}년 ${selectedMonth.month}월`}</h2>,
    right: (
      <>
        {/* {target === "NONE" ? null : target === "COUPLE" ? (
          <IconButton onClick={() => findMonthlyLedger("PERSONAL")}>
            <WcIcon color="primary" />
          </IconButton>
        ) : (
          <IconButton onClick={() => findMonthlyLedger("COUPLE")}>
            <BoyIcon color="primary" />
          </IconButton>
        )} */}

        <IconButton onClick={() => goForward("/app/ledger/register")}>
          <AddIcon color="primary" />
        </IconButton>
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
        onItemSelect={(ledgerId) => goForward(`/app/ledger/detail/${ledgerId}`)}
      />
    </Page>
  );
}
