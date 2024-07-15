import { Box, Tab, Tabs } from "@mui/material";
import HeaderBackButton from "components/header/back-button";
import Page from "components/page";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import api from "api";
import { convertToYearMonth } from "util/calendarUtil";

const StatisticTabs = ({ value, onChange, codes, sx }) => {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", ...sx }}>
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
  const [statistic, setStatistic] = useState({
    amountsPerCategory: [],
    expenditure: 0,
    income: 0,
    save: 0,
    topCount: 0,
  });

  const initialOptions = {
    chart: {
      type: "donut",
    },
    legend: {
      show: false,
    },
    responsive: [{ breakpoint: 480 }],
    labels: ["hello", "world", "test"],
    title: {
      text: "카테고리 별 금액",
      align: "center",
    },
  };

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

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
        const searchedStatistic = response.data.data;
        setStatistic(searchedStatistic);

        let newLabels = [];
        let newSeries = [];
        const etcLabel = "기타";
        let etcAmount = 0;

        searchedStatistic.amountsPerCategory.forEach(
          (amountPerCategory, index) => {
            if (index < searchedStatistic.topCount) {
              newLabels.push(amountPerCategory.category.ledgerCategoryName);
              newSeries.push(amountPerCategory.amount);
            } else {
              etcAmount += amountPerCategory.amount;
            }
          }
        );
        newLabels.push(etcLabel);
        newSeries.push(etcAmount);

        setSeries(newSeries);
        setOptions({
          ...initialOptions,
          labels: newLabels,
        });
      })
      .catch((error) => {});
  }, [selectedLedgerCode, selectedMonth]);

  return (
    <Page headerInfo={headerInfo}>
      <StatisticTabs
        sx={{
          position: "fixed",
          width: "100vw",
        }}
        codes={codes}
        value={selectedLedgerCode}
        onChange={setSelectedLedgerCode}
      />
      <Box
        sx={{
          height: "calc(100% - 50px)",
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {series.length > 0 ? (
          <Chart
            style={{ position: "absolute", top: "100px" }}
            options={options}
            series={series}
            type="donut"
            height={320}
          />
        ) : (
          <Box>입력된 가계부가 없습니다.</Box>
        )}
      </Box>
    </Page>
  );
}
