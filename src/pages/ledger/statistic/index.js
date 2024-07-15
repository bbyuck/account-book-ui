import { Box, Tab, Tabs } from "@mui/material";
import HeaderBackButton from "components/header/back-button";
import Page from "components/page";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import api from "api";
import { convertToYearMonth } from "util/calendarUtil";

const StatisticTabs = ({ value, onChange, codes }) => {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        {codes.map((code) => {
          return (
            <Tab
              key={`statistic-ledger-code-${code.value}`}
              label={code.label}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default function LedgerStatistic() {
  const codes = [
    {
      label: "전체",
      value: null,
    },
    {
      label: "저축",
      value: "S",
    },
    {
      label: "수입",
      value: "I",
    },
    {
      label: "지출",
      value: "E",
    },
  ];

  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const [selectedMonth, setSelectedMonth] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
  });
  const [selectedLedgerCode, setSelectedLedgerCode] = useState(0);
  const [series, setSeries] = useState([]);
  const [statistic, setStatistic] = useState({
    amountsPerCategory: [],
    expenditure: 0,
    income: 0,
    save: 0,
    topCount: 0,
  });

  const [options, setOptions] = useState({
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  });

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>{`${selectedMonth.year}년 ${selectedMonth.month}월`}</h2>,
  };

  useEffect(() => {
    /**
     * 통계 정보 조회
     */
    const params = {
      ym: convertToYearMonth(selectedMonth),
      ledgerCode: codes[selectedLedgerCode].value,
    };

    api
      .get("/api/v1/ledger/statistic/monthly/categorization", { params })
      .then((response) => {
        // console.log(response.data.data);
        setStatistic(response.data.data);
        setSeries(
          response.data.data.amountsPerCategory.map((amountPerCategory) => {
            return amountPerCategory.amount;
          })
        );
      })
      .catch((error) => {});
  }, [selectedLedgerCode, selectedMonth]);

  return (
    <Page headerInfo={headerInfo}>
      <StatisticTabs
        codes={codes}
        value={selectedLedgerCode}
        onChange={setSelectedLedgerCode}
      />
      <Box sx={{ marginTop: "35px", marginBottom: "35px" }}>
        <Chart options={options} series={series} type="donut" height={320} />
      </Box>
    </Page>
  );
}
