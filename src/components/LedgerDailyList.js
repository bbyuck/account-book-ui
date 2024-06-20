import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import MenuList from "components/MenuList";

export default function LedgerDailyList({ ledgers, onItemSelect }) {
  return (
    <>
      {ledgers && ledgers.length > 0 ? (
        <Box sx={{ marginBottom: "10px" }}>
          <MenuList>
            {ledgers.map((ledger) => {
              return (
                <ListItem
                  key={ledger.ledgerId}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments"></IconButton>
                  }
                  disablePadding
                >
                  <Paper
                    elevation={4}
                    sx={{
                      width: "96vw",
                      marginLeft: "2vw",
                      height: "48px",
                      lineHeight: "48px",
                      marginTop: "5px",
                      marginBottom: "5px",
                      borderRadius: "12px",
                    }}
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={() => {
                        onItemSelect(ledger.ledgerId);
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: `#${ledger.color}`,
                          position: "absolute",
                          width: "12px",
                          height: "12px",
                          borderRadius: "10px",
                          right: "3px",
                          top: "3px",
                        }}
                        className="ledger-daily-list-tag"
                      ></span>
                      <ListItemText primary={ledger.description} />
                      <ListItemText
                        style={{
                          position: "absolute",
                          right: "3vw",
                          top: "50%",
                        }}
                        primary={`${
                          ledger.ledgerCode === "E" ? "- " : "+ "
                        }${ledger.amount.toLocaleString()}원`}
                      />
                    </ListItemButton>
                  </Paper>
                </ListItem>
              );
            })}
          </MenuList>
        </Box>
      ) : null}
    </>
  );
}
