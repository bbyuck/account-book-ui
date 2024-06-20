import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import InputConfirm from "components/input/InputConfirm";
import MenuList from "components/MenuList";
import Page from "components/Page";
import EmailInput from "components/input/EmailInput";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openConfirm,
  openErrorAlert,
  openSuccessAlert,
} from "store/slice/clientInfo";
import api from "api";
import { setCoupleStatus } from "store/slice/userInfo";

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
  const [connectRequestConfirmOpen, setConnectRequestConfirmOpen] =
    useState(false);
  const emailInputRef = useRef();

  const clientSideEmailValidation = () => {
    if (targetEmail.length === 0) {
      dispatch(openErrorAlert("이메일을 입력해주세요."));
      emailInputRef.current.focus();
      return false;
    }
    return true;
  };

  const openSendRequestConfirm = () => {
    setConnectRequestConfirmOpen(true);
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
          <ListItemButton
            onClick={() => {
              alert("현재 개발중입니다. 잠시만 기다려주세요!");
            }}
          >
            <ListItemText primary="받은 요청 확인" />
          </ListItemButton>
        </ListItem>
      </MenuList>
      <InputConfirm
        open={connectRequestConfirmOpen}
        setOpen={setConnectRequestConfirmOpen}
        title={"커플 요청 보내기"}
        message={
          <>
            <p>상대의 메일을 입력해주세요.</p>
            <EmailInput
              eamilInputRef={emailInputRef}
              email={targetEmail}
              setEmail={setTargetEmail}
              emailLabel={"이메일"}
            />
          </>
        }
        confirmLabel={"요청"}
        cancelLabel={"취소"}
        onConfirmed={async () => {
          if (!clientSideEmailValidation()) {
            return false;
          }

          const params = {
            opponentEmail: targetEmail,
          };

          const requestSuccess = await api
            .post("/api/v1/couple", params)
            .then((response) => {
              return true;
            })
            .catch((error) => {
              return false;
            });

          if (!requestSuccess) {
            console.log("fail");
            return false;
          }

          api
            .get("/api/v1/couple/status")
            .then((response) => {
              dispatch(setCoupleStatus(response.data.data));
            })
            .catch((error) => {
              /**
               * do nothing
               */
            });

          return true;
        }}
        onCanceled={() => {
          setTargetEmail("");
        }}
      />
    </Page>
  );
}
