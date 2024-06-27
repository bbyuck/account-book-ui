import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ButtonBase, Container } from "@mui/material";
import Icon from "components/icon";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px",
}));

export default function CategoryGrid({ categories }) {
  return (
    <Container
      sx={{
        marginTop: "24px",
        width: "100vw",
        maxWidth: "375px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
          {categories.map((category) => (
            <Grid item xs={3} key={`category-${category.id}`}>
              <ButtonBase
                sx={{ width: "100%", borderRadius: "15px" }}
                onClick={category.action}
              >
                <Item sx={{ width: "100%" }} elevation={3}>
                  <Icon src={category.iconSrcPath} fill={category.fill} />
                  <Box sx={{ lineHeight: "25px" }}>{category.name}</Box>
                </Item>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}