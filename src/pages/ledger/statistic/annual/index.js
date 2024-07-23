import { Box } from "@mui/material";
import api from "api";
import HeaderBackButton from "components/header/back-button";
import Page from "components/page";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

export default function LedgerAnnualStatistic() {
  const [targetYear, setTargetYear] = useState(new Date().getFullYear());
  const [statistic, setStatistic] = useState({});
  const [series, setSeries] = useState([
    {
      name: "수입",
      data: Array.from({ length: 12 }, (_, i) => 0),
    },
    {
      name: "지출",
      data: Array.from({ length: 12 }, (_, i) => 0),
    },
    {
      name: "저축",
      data: Array.from({ length: 12 }, (_, i) => 0),
    },
    {
      name: "잔액",
      data: Array.from({ length: 12 }, (_, i) => 0),
    },
  ]);
  const headerInfo = {
    left: <HeaderBackButton />,
    center: `${targetYear}년`,
  };
  const chartRef = useRef(null);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const initialOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 8,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: Array.from({ length: 12 }, (_, i) => i + 1).map(
        (monthValue) => `${monthValue}월`
      ),
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: "17px",
      fontWeight: "bold",
      offsetX: chartRef.current ? chartRef.current.scrollLeft : 0,
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val.toLocaleString()} 원`;
        },
      },
    },
  };
  const [options, setOptions] = useState(initialOptions);

  const findStatistic = () => {
    const params = {
      startYear: targetYear,
      startMonth: 1,
      endYear: targetYear,
      endMonth: 12,
    };

    return api
      .get("/api/v1/ledger/statistic/period/categorization", { params })
      .then((response) => {
        const searchedStatistic = response.data.data;
        setStatistic(searchedStatistic);
        setSeries([
          {
            name: "수입",
            data: searchedStatistic.monthlyAmounts.map(
              (monthlyAmount) => monthlyAmount.monthlyIncome
            ),
          },
          {
            name: "지출",
            data: searchedStatistic.monthlyAmounts.map(
              (monthlyAmount) => monthlyAmount.monthlyExpenditure
            ),
          },
          {
            name: "저축",
            data: searchedStatistic.monthlyAmounts.map(
              (monthlyAmount) => monthlyAmount.monthlySave
            ),
          },
          {
            name: "잔액",
            data: searchedStatistic.monthlyAmounts.map(
              (monthlyAmount) =>
                monthlyAmount.monthlyIncome -
                monthlyAmount.monthlyExpenditure -
                monthlyAmount.monthlySave
            ),
          },
        ]);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    findStatistic();
  }, [targetYear]);

  const moveLegend = () => {
    if (chartRef.current) {
      const scrollLeft = chartRef.current.scrollLeft;
      setOptions({
        ...options,
        legend: { offsetX: scrollLeft },
      });
    }
  };

  const handleScroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    setScrollTimeout(
      setTimeout(() => {
        moveLegend();
      }, 30)
    );
  };

  return (
    <Page headerInfo={headerInfo}>
      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 50px)",
          paddingTop: "50px",
          overFlowY: "hidden",
          overflowX: "auto",
        }}
        ref={chartRef}
        onScroll={handleScroll}
      >
        <Box
          sx={{
            width: "200vw",
            height: "100%",
          }}
        >
          <Chart
            style={{ height: "100%" }}
            options={options}
            series={series}
            type="bar"
            height={400}
          />
        </Box>
      </Box>
    </Page>
  );
}
