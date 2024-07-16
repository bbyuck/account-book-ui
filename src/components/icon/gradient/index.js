import { styled } from "@mui/material";

export default function GradientIcon({
  icon,
  id,
  leftBottomColor,
  rightTopColor,
}) {
  const StyledIcon = styled(icon)(({ theme }) => ({
    "& path": {
      fill: `url(#${id})`,
    },
  }));
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: leftBottomColor, stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: rightTopColor, stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
      <StyledIcon />
    </>
  );
}
