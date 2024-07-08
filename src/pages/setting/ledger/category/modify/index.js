import AppInputBox from "components/input/input-box";
import Page from "components/page/index";
import CategoryGrid from "components/category-grid";
import HeaderBackButton from "components/header/back-button";
import TextInput from "components/input/text";
import { useEffect, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LedgerCodeSelect from "components/input/ledger-code-select";
import { Box, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "api";
import { validateInsertAndUpdate } from "util/validation/ledgerCategory";
import { setCategories } from "store/slice/userInfo";
import { openConfirm } from "store/slice/clientInfo";
import HeaderDoneButton from "components/header/done-button";

export default function SettingLedgerCategoryModify() {
  const [selectedIcon, setSelectedIcon] = useState(-1);

  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryLedgerCode, setCategoryLedgerCode] = useState(null);
  const [complete, setComplete] = useState(false);

  const { selectedLedgerCategoryIndex } = useParams();
  const { categories } = useSelector((state) => state.userInfo);

  const { icons } = useSelector((state) => state.clientInfo);
  const [iconButtons, setIconButtons] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateLedgerCategory = async () => {
    const params = {
      ledgerCategoryName: categoryName,
      ledgerCode: categoryLedgerCode,
      iconId: selectedIcon,
    };
    if (!validateInsertAndUpdate(params)) {
      return false;
    }

    await api
      .put(`/api/v1/ledger/category/${categoryId}`, params)
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

  const deleteLedgerCategory = async () => {
    await api
      .delete(`/api/v1/ledger/category/${categoryId}`)
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

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 수정</h2>,
    right: (
      <>
        <IconButton
          onClick={() =>
            dispatch(
              openConfirm({
                title: "카테고리 삭제",
                message: "카테고리를 삭제하시겠습니까?",
                confirmLabel: "삭제",
                cancelLabel: "취소",
                onConfirmed: deleteLedgerCategory,
              })
            )
          }
        >
          <DeleteIcon color={"error"} />
        </IconButton>
        <HeaderDoneButton
          onClick={() =>
            dispatch(
              openConfirm({
                title: "카테고리 수정",
                message: "카테고리를 수정하시겠습니까?",
                confirmLabel: "수정",
                cancelLabel: "취소",
                onConfirmed: updateLedgerCategory,
              })
            )
          }
          complete={complete}
        />
      </>
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
    /**
     * 버튼 만들기
     */
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

    /**
     * 선택된 category data 가져오기
     */
    const selectedCategory = categories.value[selectedLedgerCategoryIndex];

    setCategoryId(selectedCategory.ledgerCategoryId);
    setCategoryName(selectedCategory.ledgerCategoryName);
    setCategoryLedgerCode(selectedCategory.ledgerCode);
    setSelectedIcon(selectedCategory.iconId);
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
