import { IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Page from "components/Page";
import { useLocation, useNavigate } from "react-router";

export default function LedgerRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

  const headerInfo = {
    left: (
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <NavigateBeforeIcon />
      </IconButton>
    ),
    center: <h2>Hello World</h2>,
  };

  return <Page headerInfo={headerInfo}>hello world</Page>;
}
