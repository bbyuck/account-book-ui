import LedgerCalendarCarousel from "components/LedgerCalendarCarousel";
import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Page from "components/Page";
import { useDispatch, useSelector } from "react-redux";
import { namesOfDay, setSelectedDate } from "store/slice/ledgerInfo";
import http from "api";

const testData = {
  year: 2024,
  month: 4,
  totalIncome: 8000000,
  totalExpenditure: 300000,
  totalSave: 740000,
  ledgersPerDay: {
    1: {
      ledgers: [
        {
          ledgerId: 2,
          ownerNickname: "히욱",
          ledgerCode: "E",
          ledgerCodeValue: "지출",
          day: 1,
          amount: 100000,
          description: "M소비1",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 100000,
    },
    2: {
      ledgers: [
        {
          ledgerId: 3,
          ownerNickname: "히욱",
          ledgerCode: "E",
          ledgerCodeValue: "지출",
          day: 2,
          amount: 200000,
          description: "M소비2",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 200000,
    },
    3: {
      ledgers: [
        {
          ledgerId: 4,
          ownerNickname: "히욱",
          ledgerCode: "S",
          ledgerCodeValue: "저축",
          day: 3,
          amount: 150000,
          description: "M저축1",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 150000,
    },
    4: {
      ledgers: [
        {
          ledgerId: 5,
          ownerNickname: "히욱",
          ledgerCode: "S",
          ledgerCodeValue: "저축",
          day: 4,
          amount: 220000,
          description: "M저축2",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 220000,
    },
    21: {
      ledgers: [
        {
          ledgerId: 1,
          ownerNickname: "히욱",
          ledgerCode: "I",
          ledgerCodeValue: "소득",
          day: 21,
          amount: 4000000,
          description: "M월급",
        },
      ],
      dailyIncome: 4000000,
      dailyExpenditure: 0,
    },
    5: {
      ledgers: [
        {
          ledgerId: 7,
          ownerNickname: "아내",
          ledgerCode: "S",
          ledgerCodeValue: "저축",
          day: 5,
          amount: 150000,
          description: "W저축1",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 150000,
    },
    8: {
      ledgers: [
        {
          ledgerId: 8,
          ownerNickname: "아내",
          ledgerCode: "S",
          ledgerCodeValue: "저축",
          day: 8,
          amount: 220000,
          description: "W저축2",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 220000,
    },
    25: {
      ledgers: [
        {
          ledgerId: 6,
          ownerNickname: "아내",
          ledgerCode: "I",
          ledgerCodeValue: "소득",
          day: 25,
          amount: 4000000,
          description: "W월급",
        },
      ],
      dailyIncome: 4000000,
      dailyExpenditure: 0,
    },
  },
};

export default function LedgerMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const [monthlyData, setMonthlyData] = useState(testData);

  const getPrev = (current) => {
    return {
      year: current.month === 1 ? current.year - 1 : current.year,
      month: current.month === 1 ? 12 : current.month - 1,
    };
  };
  const getNext = (current) => {
    return {
      year: current.month === 12 ? current.year + 1 : current.year,
      month: current.month === 12 ? 1 : current.month + 1,
    };
  };
  const buffering = (newIdx) => {
    setSelectedMonth(newIdx);

    let tmp = [];
    const current = monthBuffer[newIdx];
    const prev = getPrev(current);
    const next = getNext(current);

    if (newIdx === 0) {
      tmp = [current, next, prev];
    } else if (newIdx === 1) {
      tmp = [prev, current, next];
    } else if (newIdx === 2) {
      tmp = [next, prev, current];
    }

    setMonthBuffer(tmp);
  };
  const [selectedMonth, setSelectedMonth] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
  });

  const [monthBuffer, setMonthBuffer] = useState([
    getPrev(selectedMonth),
    selectedMonth,
    getNext(selectedMonth),
  ]);

  const [selectedDay, setSelectedDay] = useState(selectedDate.day);

  useEffect(() => {
    setMonthlyData(null);
    /* TODO -> 월별 가계부 조회 API 호출 */
    http
      .get(
        `/api/v1/couple/monthly/ledger?ym=${selectedMonth.year}${String(
          selectedMonth.month
        ).padStart(2, "0")}`
      )
      .then((response) => {
        setMonthlyData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedMonth]);

  const headerInfo = {
    center: <h2>{`${selectedMonth.year}년 ${selectedMonth.month}월`}</h2>,
    right: (
      <IconButton
        onClick={() => {
          dispatch(
            setSelectedDate({
              year: selectedMonth.year,
              month: selectedMonth.month,
              day: selectedDay,
              dayName:
                namesOfDay[
                  new Date(
                    selectedMonth.year,
                    selectedMonth.month - 1,
                    selectedDay
                  ).getDay()
                ],
            })
          );
          navigate("/ledger/register", {
            state: {
              push: true,
            },
          });
        }}
      >
        <AddIcon color="primary" />
      </IconButton>
    ),
  };

  /**
   * 가계부 목록
   */

  return (
    <Page headerInfo={headerInfo}>
      <LedgerCalendarCarousel
        monthlyData={monthlyData}
        monthBuffer={monthBuffer}
        selectedMonth={selectedMonth}
        onMonthSelect={setSelectedMonth}
        selectedDay={selectedDay}
        onDaySelect={setSelectedDay}
        buffering={buffering}
      />
      <Box>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {monthlyData && monthlyData.ledgersPerDay[selectedDay]
            ? monthlyData.ledgersPerDay[selectedDay].ledgers.map((ledger) => {
                return (
                  <ListItem
                    key={ledger}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments"></IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      style={{ backgroundColor: "lightGrey" }}
                      role={undefined}
                      onClick={() => {
                        navigate(`/ledger/detail/${ledger.ledgerId}`, {
                          state: {
                            push: true,
                          },
                        });
                      }}
                    >
                      <ListItemText primary={ledger.description} />
                      <ListItemText
                        style={{ position: "absolute", right: "3vw" }}
                        primary={ledger.amount}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })
            : null}
        </List>
      </Box>
    </Page>
  );
}
