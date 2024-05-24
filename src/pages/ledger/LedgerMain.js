import LedgerCalendarCarousel from "components/LedgerCalendarCarousel";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Page from "components/Page";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "store/slice/ledgerInfo";
import http from "api";
import LedgerDailyList from "components/LedgerDailyList";

export default function LedgerMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const [monthlyData, setMonthlyData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
  });
  const [selectedDay, setSelectedDay] = useState(selectedDate.day);

  useEffect(() => {
    setMonthlyData(null);
    /* TODO -> 월별 가계부 조회 API 호출 */
    const params = {
      ym: `${selectedMonth.year}${String(selectedMonth.month).padStart(
        2,
        "0"
      )}`,
    };
    http
      .get(`/api/v1/couple/monthly/ledger`, { params })
      .then((response) => {
        setMonthlyData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedMonth]);

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
  const goToRegisterPage = () => {
    navigate("/ledger/register", {
      state: {
        push: true,
      },
    });
  };

  const goToDetailPage = (ledgerId) => {
    navigate(`/ledger/detail/${ledgerId}`, {
      state: {
        push: true,
      },
    });
  };

  const headerInfo = {
    center: <h2>{`${selectedMonth.year}년 ${selectedMonth.month}월`}</h2>,
    right: (
      <IconButton onTouchEnd={goToRegisterPage}>
        <AddIcon color="primary" />
      </IconButton>
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
        onItemSelect={(ledgerId) => goToDetailPage(ledgerId)}
      />
    </Page>
  );
}
