import api from "api";
import HeaderBackButton from "components/header/back-button";
import Page from "components/page";
import { useEffect } from "react";

export default function LedgerAnnualStatistic() {
  const headerInfo = {
    left: <HeaderBackButton />,
  };

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

  return <Page headerInfo={headerInfo}></Page>;
}
