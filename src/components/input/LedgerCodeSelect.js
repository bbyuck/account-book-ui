import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { Avatar, Box, Grid, IconButton } from "@mui/material";
import { LEDGER_COLOR } from "consts/colors";

export default function LedgerCodeSelect({ style, value, onSelect, header }) {
  const ledgerCodes = [
    {
      icon: <AccountBalanceIcon />,
      value: "S",
      label: "저축",
    },
    {
      icon: <AttachMoneyIcon />,
      value: "I",
      label: "수입",
    },
    {
      icon: <MoneyOffIcon />,
      value: "E",
      label: "지출",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, ...style }}>
      {!header ? null : (
        <Box
          sx={{
            height: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Box sx={{ marginRight: "auto", paddingLeft: "16px" }}>{header}</Box>
        </Box>
      )}
      <Grid container spacing={2}>
        {ledgerCodes.map((ledgerCode, index) => (
          <Grid item xs={4} key={`ledger-code-${ledgerCode.value}`}>
            <IconButton onClick={() => onSelect(ledgerCode.value)}>
              <Avatar
                style={
                  ledgerCode.value === value
                    ? {
                        backgroundColor: LEDGER_COLOR[ledgerCode.value],
                      }
                    : null
                }
              >
                {ledgerCode.icon}
              </Avatar>
            </IconButton>
            <div>{ledgerCode.label}</div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
