import AppInputBox from "components/input/input-box";
import Page from "components/page/index";
import CategoryGrid from "components/category-grid";
import HeaderBackButton from "components/header/back-button";
import TextInput from "components/input/text";
import { useEffect, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LedgerCodeSelect from "components/input/ledger-code-select";
import { Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import api from "api";
import { openConfirm } from "store/slice/clientInfo";
import { setCategories } from "store/slice/userInfo";
import { useNavigate } from "react-router-dom";
import { validateInsertAndUpdate } from "util/validation/ledgerCategory";
import HeaderDoneButton from "components/header/done-button";

export default function SettingLedgerCategoryAdd() {
  const [selectedIcon, setSelectedIcon] = useState(-1);
  const [categoryName, setCategoryName] = useState("");
  const [categoryLedgerCode, setCategoryLedgerCode] = useState(null);
  const [complete, setComplete] = useState(false);
  const { icons } = useSelector((state) => state.clientInfo);
  const [iconButtons, setIconButtons] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addLedgerCategory = async () => {
    const params = {
      ledgerCategoryName: categoryName,
      ledgerCode: categoryLedgerCode,
      iconId: selectedIcon,
    };

    if (!validateInsertAndUpdate(params)) {
      return false;
    }

    await api
      .post("/api/v1/ledger/category", params)
      .then((response) => {
        api
          .get("/api/v1/ledger/category")
          .then((response) => {
            dispatch(setCategories(response.data.data.ledgerCategoryList));
          })
          .catch((error) => {});

        navigate(-1);
      })
      .catch((error) => {
        return false;
      });

    return true;
  };

  const openAddLedgerCategoryConfirm = () => {
    const confirmParam = {
      title: "카테고리 추가",
      message: "카테고리를 추가하시겠습니까?",
      confirmLabel: "추가",
      cancelLabel: "취소",
      onConfirmed: addLedgerCategory,
    };

    dispatch(openConfirm(confirmParam));
  };

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 추가</h2>,
    right: (
      <HeaderDoneButton
        onClick={openAddLedgerCategoryConfirm}
        complete={complete}
      />
    ),
  };

  useEffect(() => {
    setComplete(
      selectedIcon > -1 &&
        categoryLedgerCode &&
        categoryName &&
        categoryName.trim().length > 0
    );
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
