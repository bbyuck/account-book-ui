import { openErrorAlert } from "store/slice/clientInfo";
import store from "store";

export const validateInsertAndUpdate = (params) => {
  if (
    !params.ledgerCategoryName ||
    params.ledgerCategoryName.trim().length === 0
  ) {
    store.dispatch(openErrorAlert("카테고리 명은 필수입니다."));
    return false;
  }

  if (!params.ledgerCode) {
    store.dispatch(
      openErrorAlert("어떤 가계부 항목의 카테고리인지 선택해주세요.")
    );
    return false;
  }

  if (!params.iconId < 0) {
    store.dispatch(openErrorAlert("카테고리의 아이콘을 선택해주세요."));
    return false;
  }

  return true;
};
