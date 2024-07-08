import { Divider, List } from "@mui/material";

export default function MenuList({ children, subheader }) {
  return (
    <>
      {!subheader ? null : (
        <>
          <Divider style={{ marginBottom: "10px" }} />
          <div
            style={{
              textAlign: "left",
              position: "relative",
              marginLeft: "36px",
            }}
          >
            {subheader}
          </div>
          <Divider style={{ marginTop: "10px" }} />
        </>
      )}
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {children}
      </List>
    </>
  );
}
