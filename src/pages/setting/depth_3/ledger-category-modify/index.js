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
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

export default function SettingLedgerCategoryModify() {
  const [selectedIcon, setSelectedIcon] = useState(-1);
  const [categoryName, setCategoryName] = useState("");
  const [categoryLedgerCode, setCategoryLedgerCode] = useState(null);
  const [complete, setComplete] = useState(false);

  const { icons } = useSelector((state) => state.clientInfo);
  const [iconButtons, setIconButtons] = useState([]);

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 수정</h2>,
    right: (
      <>
        <IconButton
          onClick={() => {
            alert("카테고리 삭제 API 호출");
          }}
        >
          <DeleteIcon color={"error"} />
        </IconButton>
        <IconButton
          onClick={() => {
            alert("카테고리 수정 API 호출");
          }}
          disabled={!complete}
        >
          <AssignmentTurnedInIcon color={complete ? "primary" : "disabled"} />
        </IconButton>
      </>
    ),
  };

  useEffect(() => {
    setComplete(selectedIcon > -1 && categoryLedgerCode);
  }, [selectedIcon, categoryName, categoryLedgerCode]);

  useEffect(() => {
    setIconButtons(
      icons.value.map((icon) => {
        const iconButton = {
          id: icon.iconId,
          iconName: icon.iconName,
          action: () => {
            setSelectedIcon(icon.iconId);
          },
        };
        return iconButton;
      })
    );
  }, []);

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
        <CategoryGrid categories={iconButtons} selected={selectedIcon} />
      </Box>
    </Page>
  );
}
