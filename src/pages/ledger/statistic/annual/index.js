import { Box } from "@mui/material";
import api from "api";
import HeaderBackButton from "components/header/back-button";
import Page from "components/page";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function LedgerAnnualStatistic() {
  const headerInfo = {
    left: <HeaderBackButton />,
  };

  const initialOptions = {
    series: [
      {
        name: "수입",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 44, 55, 57],
      },
      {
        name: "지출",
        data: [76, 0, 101, 98, 87, 105, 91, 114, 94, 98, 87, 105],
      },
      {
        name: "저축",
        data: [0, 41, 36, 26, 45, 48, 52, 53, 41, 45, 48, 52],
      },
    ],
    chart: {
      type: "bar",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    grid: {
      show: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: "17px",
      fontWeight: "bold",
    },
    yaxis: { show: false },
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

  useEffect(() => {
    const params = {
      startYear: 2024,
      startMonth: 1,
      endYear: 2024,
      endMonth: 12,
    };

    api
      .get("/api/v1/ledger/statistic/period/categorization", { params })
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <Page headerInfo={headerInfo}>
      <Box
        sx={{
          width: "1500px",
        }}
      >
        <Chart
          options={options}
          series={options.series}
          type="bar"
          height={320}
        />
      </Box>
      테스트 text
    </Page>
  );
}
