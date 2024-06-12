import { Dialog } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { loadingEnd } from "store/slice/clientInfo";

export default function AppLoading() {
  const { loading } = useSelector((state) => state.clientInfo);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(loadingEnd());
  };

  return (
    <Dialog open={loading} onClose={handleClose}>
      <CircularProgress />
    </Dialog>
  );
}
