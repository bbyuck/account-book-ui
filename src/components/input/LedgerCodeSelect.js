import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { Avatar, Box, Grid, IconButton } from "@mui/material";

export default function LedgerCodeSelect({ style, value, onSelect }) {
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
      <Grid container spacing={2}>
        {ledgerCodes.map((ledgerCode, index) => (
          <Grid item xs={4} key={`ledger-code-${ledgerCode.value}`}>
            <IconButton onClick={() => onSelect(ledgerCode.value)}>
              <Avatar
                style={
                  ledgerCode.value === value
                    ? {
                        backgroundColor: "blue",
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
