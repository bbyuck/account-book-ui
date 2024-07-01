import { Box, IconButton, Paper } from "@mui/material";
import Page from "components/Page";
import { useNavigate, useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "components/style/TextField.css";
import api from "api";
import MoneyInput from "components/input/MoneyInput";
import DatePicker from "components/input/DatePicker";
import DescriptionInput from "components/input/DescriptionInput";
import LedgerCodeSelect from "components/input/LedgerCodeSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { setSelectedDetailDate } from "store/slice/ledgerInfo";
import { convertToLocalDateFormat } from "util/calendarUtil";
import { fromLocaleStringToNumber } from "util/numberUtil";
import { openConfirm, setPageTransition } from "store/slice/clientInfo";
import HeaderBackButton from "components/header/back-button";
import HeaderDoneButton from "components/header/done-button";
import CategoryGrid from "components/category-grid";

export default function LedgerDetail() {
  const navigate = useNavigate();
  const { ledgerId } = useParams();
  // testData
  const dispatch = useDispatch();
  const { selectedDate, selectedDetailDate } = useSelector(
    (state) => state.ledgerInfo
  );
  const { categories } = useSelector((state) => state.userInfo);
  const [requiredInputCompleted, setRequiredInputCompleted] = useState(false);

  /**
   * ================= 날짜 ===================
   */
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  /**
   * ================= 날짜 ===================
   */

  /**
   * ================= 금액 ===================
   */

  const [amount, setAmount] = useState("0");

  /**
   * ================= 금액 ===================
   */

  /**
   * ================= 가계부 코드 버튼 ===================
   */
  const [ledgerCode, setLedgerCode] = useState();

  /**
   * ================= 가계부 코드 버튼 ===================
   */

  /**
   * ================= 설명 ===================
   */

  const [description, setDescription] = useState("");

  /**
   * ================= 설명 ===================
   */

  /**
   * ================= 설명 ===================
   */
  const [ledgerCategoryButtons, setLedgerCategoryButtons] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const updateLedger = async () => {
    if (fromLocaleStringToNumber(amount) === 0) {
      alert("가계부 금액은 0원 이상이어야 합니다.");
      return;
    }

    const param = {
      ledgerDate: convertToLocalDateFormat(selectedDetailDate),
      ledgerCode: ledgerCode,
      ledgerAmount: fromLocaleStringToNumber(amount),
      ledgerDescription: description,
      ledgerCategoryId: selectedCategoryId,
    };
    await api
      .put(`/api/v1/ledger/${ledgerId}`, param)
      .then((response) => {
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });

    return true;
  };

  const deleteLedger = async () => {
    await api
      .delete(`/api/v1/ledger/${ledgerId}`)
      .then((response) => {
        if (response.data.data.success) {
          navigate(-1);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return true;
  };

  const findLedger = () => {
    const apiUrl = `/api/v1/ledger/${ledgerId}`;
    api
      .get(apiUrl)
      .then((response) => {
        setAmount(response.data.data.amount.toLocaleString());
        setDescription(response.data.data.description);
        setLedgerCode(response.data.data.ledgerCode);
        setSelectedCategoryId(response.data.data.category.ledgerCategoryId);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    dispatch(setSelectedDetailDate(selectedDate));
  }, [dispatch]);

  useEffect(() => {
    if (!ledgerId) {
      alert("잘못된 접근입니다.");
      sessionStorage.setItem("buttonBack", true);
      dispatch(setPageTransition("pop"));
      navigate("/app/ledger", {
        replace: true,
      });
    }

    findLedger();
  }, [ledgerId, navigate, dispatch]);

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>가계부 수정</h2>,
    right: (
      <>
        <IconButton
          onClick={() =>
            dispatch(
              openConfirm({
                title: "삭제하시겠습니까?",
                message: "삭제된 가계부는 복구할 수 없습니다.",
                confirmLabel: "삭제",
                cancelLabel: "취소",
                onConfirmed: () => {
                  return deleteLedger();
                },
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
                title: "가계부 수정",
                message: "가계부를 수정하시겠습니까?",
                confirmLabel: "수정",
                cancelLabel: "취소",
                onConfirmed: () => {
                  return updateLedger();
                },
              })
            )
          }
          complete={requiredInputCompleted}
        />
      </>
    ),
  };

  useEffect(() => {
    setLedgerCategoryButtons(
      categories.value
        .filter((category) => category.ledgerCode === ledgerCode)
        .map((category) => {
          const categoryButton = {
            id: category.ledgerCategoryId,
            iconName: category.iconName,
            ledgerCode: category.ledgerCode,
            name: category.ledgerCategoryName,
            action: () => setSelectedCategoryId(category.ledgerCategoryId),
          };
          return categoryButton;
        })
    );
  }, [categories, ledgerCode]);

  useEffect(() => {
    setRequiredInputCompleted(
      ledgerCode && fromLocaleStringToNumber(amount) > 0
    );
  }, [ledgerCode, amount]);

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
        <DatePicker
          label={"날짜"}
          selectedDate={selectedDetailDate}
          selectDate={(pickedDate) => {
            dispatch(setSelectedDetailDate(pickedDate));
          }}
          pickerOpen={datePickerOpen}
          setPickerOpen={setDatePickerOpen}
        />

        <MoneyInput
          style={{ marginTop: "20px" }}
          value={amount}
          label={"금액을 입력해주세요."}
          onChange={setAmount}
          max={100000000}
        />

        <DescriptionInput
          label={"상세 내역을 입력해주세요."}
          style={{ marginTop: "20px" }}
          value={description}
          onChange={setDescription}
        />

        <LedgerCodeSelect
          style={{ marginTop: "20px" }}
          value={ledgerCode}
          onSelect={(newValue) => {
            setLedgerCode(newValue === ledgerCode ? null : newValue);
            setSelectedCategoryId(null);
          }}
        />
      </Paper>

      <Box sx={{ position: "relative", marginTop: "350px" }}>
        <CategoryGrid
          categories={ledgerCategoryButtons}
          selected={selectedCategoryId}
        />
      </Box>

      {/* <Zoom
        in={true}
        timeout={200}
        style={{
          transitionDelay: "200ms",
        }}
        unmountOnExit
      >
        <Fab
          sx={{
            position: "absolute",
            bottom: 25,
            right: 25,
          }}
          aria-label={"Delete"}
          color="error"
          onClick={deleteButtonClickHandler}
        >
          <DeleteIcon />
        </Fab>
      </Zoom> */}
    </Page>
  );
}
