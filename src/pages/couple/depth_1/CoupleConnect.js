import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuList from "components/MenuList";
import Page from "components/Page";
import EmailInput from "components/input/EmailInput";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openConfirm, openErrorAlert } from "store/slice/clientInfo";

export default function CoupleConnect() {
  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>커플 연결</h2>,
  };
  const dispatch = useDispatch();
  const { coupleStatus, userCoupleStatus } = useSelector(
    (state) => state.userInfo
  );
  const [targetEmail, setTargetEmail] = useState("");

  const clientSideEmailValidation = () => {
    if (targetEmail.length === 0) {
      dispatch(openErrorAlert("이메일을 입력해주세요."));
      return false;
    }
    return true;
  };

  const openSendRequestConfirm = () => {
    dispatch(
      openConfirm({
        title: "커플 요청 보내기",
        message: (
          <>
            <p>상대의 메일을 입력해주세요.</p>
            <EmailInput
              email={targetEmail}
              setEmail={setTargetEmail}
              emailLabel={"이메일"}
            />
          </>
        ),
        confirmLabel: "요청",
        cancelLabel: "취소",
        onConfirmed: () => {
          if (!clientSideEmailValidation()) {
            return false;
          }

          console.log(`${targetEmail}로 api 콜`);
          return true;
        },
      })
    );
  };

  const cannotSendRequest = () => {
    return coupleStatus !== "NONE" || userCoupleStatus !== "NONE";
  };

  return (
    <Page headerInfo={headerInfo}>
      <MenuList>
        {cannotSendRequest() ? null : (
          <ListItem>
            <ListItemButton onClick={openSendRequestConfirm}>
              <ListItemText primary="요청 보내기" />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem>
          <ListItemButton onClick={() => {}}>
            <ListItemText primary="받은 요청 확인" />
          </ListItemButton>
        </ListItem>
      </MenuList>
    </Page>
  );
}
