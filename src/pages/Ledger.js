import CalendarCarousel from "components/CalendarCarousel";
import LedgerSubHeader from "components/LedgerSubHeader";
import { useEffect, useState } from "react";

const monthlyData = {
  year: 2024,
  month: 4,
  income: 8000000,
  expenditure: 1140000,
  ledgersPerDay: {
    1: {
      ledgers: [
        {
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
          ownerNickname: "히욱",
          ledgerCode: "I",
          ledgerCodeValue: "소득",
          day: 21,
          amount: 4000000,
          description: "M월급",
        },
        {
          ownerNickname: "히욱",
          ledgerCode: "E",
          ledgerCodeValue: "지출",
          day: 21,
          amount: 4000000,
          description: "M월급",
        },
      ],
      dailyIncome: 4000000000,
      dailyExpenditure: 4000000,
    },
    5: {
      ledgers: [
        {
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

export default function Ledger() {
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
  const [today, setToday] = useState(new Date());
  const [thisMonth, setThisMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [monthBuffer, setMonthBuffer] = useState([
    getPrev(thisMonth),
    thisMonth,
    getNext(thisMonth),
  ]);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    /* TODO -> 월별 가계부 조회 API 호출 */
  }, [selectedMonth]);

  return (
    <div className="page-wrapper">
      <h2>{`${monthBuffer[selectedMonth].year}년 ${monthBuffer[selectedMonth].month}월`}</h2>
      <LedgerSubHeader
        income={monthlyData.income}
        expenditure={monthlyData.expenditure}
      />
      <CalendarCarousel
        monthlyData={monthlyData}
        monthBuffer={monthBuffer}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        buffering={buffering}
      />
    </div>
  );
}
