import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import MenuList from "components/menu-list";
import Icon from "components/icon";

export default function LedgerDailyList({ ledgers, onItemSelect }) {
  const renderCategory = (ledger) => {
    return (
      <Box sx={{ position: "absolute", top: 0 }}>
        {ledger.category && ledger.category.ledgerCategoryId ? (
          <>
            <Icon
              style={{
                display: "inline-block",
                paddingRight: "5px",
              }}
              name={ledger.category.iconName}
              size={"15px"}
            />
            {ledger.category.ledgerCategoryName}
          </>
        ) : null}
      </Box>
    );
  };

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
                    elevation={3}
                    sx={{
                      width: "96vw",
                      marginLeft: "2vw",
                      height: "74px",
                      lineHeight: "48px",
                      marginTop: "5px",
                      marginBottom: "5px",
                      borderRadius: "12px",
                      display: "flex",
                    }}
                  >
                    <ListItemButton
                      style={{ borderRadius: "12px" }}
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

                      {/* 카테고리 렌더링 */}
                      {renderCategory(ledger)}

                      <Box sx={{ position: "absolute", bottom: 0 }}>
                        {ledger.description}
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          right: "16px",
                          bottom: 0,
                        }}
                      >{`${
                        ledger.ledgerCode === "E"
                          ? "- "
                          : ledger.ledgerCode === "I"
                          ? "+ "
                          : ""
                      }${ledger.amount.toLocaleString()}원`}</Box>
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
