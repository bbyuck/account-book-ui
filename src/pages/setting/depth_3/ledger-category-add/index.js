import AppInputBox from "components/AppInputBox";
import Page from "components/Page";
import CategoryGrid from "components/category-grid";
import HeaderBackButton from "components/input/HeaderBackButton";
import TextInput from "components/input/text";
import { useEffect, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LedgerCodeSelect from "components/input/LedgerCodeSelect";
import { Box, IconButton, Paper } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const INITAIL_ICON_LIST = [
  {
    id: 1,
    iconName: "credit-card",
  },
  {
    id: 2,
    iconName: "taxi",
  },
  {
    id: 3,
    iconName: "spoon",
  },
  {
    id: 4,
    iconName: "hospital",
  },
  {
    id: 5,
    iconName: "heart",
  },
  {
    id: 6,
    iconName: "martini-glass-citrus",
  },
];

const ICON_LIST = Array.from({ length: 50 }, (_, i) => i + 1).map((num) => {
  return { id: num, iconName: INITAIL_ICON_LIST[num % 6].iconName };
});

export default function SettingLedgerCategoryAdd() {
  const [icons, setIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(-1);
  const [categoryName, setCategoryName] = useState("");
  const [categoryLedgerCode, setCategoryLedgerCode] = useState(null);

  const [complete, setComplete] = useState(false);

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 추가</h2>,
    right: (
      <IconButton
        onClick={() => {
          alert("카테고리 추가 API 호출");
        }}
        disabled={!complete}
      >
        <AssignmentTurnedInIcon color={complete ? "primary" : "disabled"} />
      </IconButton>
    ),
  };

  useEffect(() => {
    setIcons(
      ICON_LIST.map((icon) => {
        icon.action = () => {
          setSelectedIcon(icon.id);
        };
        return icon;
      })
    );
  }, []);

  useEffect(() => {
    setComplete(selectedIcon > -1 && categoryLedgerCode);
  }, [selectedIcon, categoryName, categoryLedgerCode]);

  return (
    <Page headerInfo={headerInfo}>
      <Paper
        elevation={5}
        sx={{
          paddingBottom: "25px",
          width: "100vw",
          position: "fixed",
          backgroundColor: "#fff",
          zIndex: 2,
        }}
      >
        <AppInputBox>
          <TextInput
            label={"이름"}
            value={categoryName}
            onChange={setCategoryName}
            MuiIcon={LocalOfferIcon}
          />
        </AppInputBox>
        <LedgerCodeSelect
          style={{ marginTop: "25px" }}
          value={categoryLedgerCode}
          onSelect={setCategoryLedgerCode}
          header={"추가 대상"}
        />
      </Paper>
      <Box sx={{ position: "relative", marginTop: "235px" }}>
        <CategoryGrid categories={icons} selected={selectedIcon} />
      </Box>
    </Page>
  );
}
