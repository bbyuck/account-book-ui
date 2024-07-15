import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import Icon from "components/icon";
import ListItemNoButton from "components/list-item-no-button";
import MenuList from "components/menu-list";

export default function StatisticCategoryList({ amountsPerCategory }) {
  const renderCategory = (amountPerCategory) => {
    return (
      <Box sx={{ position: "absolute", top: 0, left: "20px" }}>
        {amountPerCategory.category &&
        amountPerCategory.category.ledgerCategoryId ? (
          <>
            <Icon
              style={{
                display: "inline-block",
                paddingRight: "5px",
              }}
              name={amountPerCategory.category.iconName}
              size={"15px"}
            />
          </>
        ) : null}
        {amountPerCategory.category.ledgerCategoryName}
      </Box>
    );
  };

  return (
    <>
      {amountsPerCategory && amountsPerCategory.length > 0 ? (
        <Box sx={{ marginBottom: "10px" }}>
          <MenuList>
            {amountsPerCategory.map((amountPerCategory, index) => {
              return (
                <ListItem
                  key={`statistic-category-${index}`}
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
                      height: "48px",
                      lineHeight: "48px",
                      marginTop: "5px",
                      marginBottom: "5px",
                      borderRadius: "12px",
                      display: "flex",
                    }}
                  >
                    <ListItemNoButton
                      style={{ borderRadius: "12px" }}
                      role={undefined}
                    >
                      {/* 카테고리 렌더링 */}
                      {renderCategory(amountPerCategory)}

                      <Box
                        sx={{
                          position: "absolute",
                          right: "16px",
                          bottom: 0,
                        }}
                      >{`${amountPerCategory.amount.toLocaleString()}원`}</Box>
                    </ListItemNoButton>
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
