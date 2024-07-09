import { Box, Tab, Tabs } from "@mui/material";
import HeaderBackButton from "components/header/back-button";
import Page from "components/page";
import { useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

const StatisticTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="카테고리" />
        <Tab label="사용자" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>
  );
};

export default function LedgerStatistic() {
  const { selectedDate } = useSelector((state) => state.ledgerInfo);
  const [selectedMonth, setSelectedMonth] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
  });

  const [series, setSeries] = useState([44, 55, 41, 17, 15]);

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
  return (
    <Page headerInfo={headerInfo}>
      <Chart options={options} series={series} type="donut" height={320} />
    </Page>
  );
}
