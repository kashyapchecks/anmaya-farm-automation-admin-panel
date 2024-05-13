import React from "react";
import styled from "@emotion/styled";
const OverLay = styled("div")(({ theme, sideBarOpen }) => ({
  zIndex: 2,
  position: "absolute",
  backgroundColor: "black",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0.5,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
    visibility: sideBarOpen ? "visisble" : "hidden",
  },
}));
function OverLay() {
  return <div>OverLay</div>;
}

export default OverLay;
