import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function LedgerDailyList({ ledgers, onItemSelect }) {
  return (
    <>
      {ledgers && ledgers.length > 0 ? (
        <Box>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {ledgers.map((ledger) => {
              return (
                <ListItem
                  key={ledger.ledgerId}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments"></IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    style={{
                      backgroundColor: "lightGrey",
                      height: "48px",
                      marginTop: "1px",
                      marginBottom: "1px",
                    }}
                    role={undefined}
                    onClick={() => {
                      onItemSelect(ledger.ledgerId);
                    }}
                  >
                    <ListItemText primary={ledger.description} />
                    <ListItemText
                      style={{ position: "absolute", right: "3vw" }}
                      primary={`${ledger.amount.toLocaleString()}원`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ) : null}
    </>
  );
}
