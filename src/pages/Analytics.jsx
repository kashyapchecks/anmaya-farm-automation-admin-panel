import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import Lottie from "react-lottie";

import notFoundAnimationData from "../animations/not_found.json";

const AnalyticsContainer = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

function Analytics() {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundAnimationData,
  };
  return (
    <AnalyticsContainer>
      <Lottie options={lottieOptions} width={300} height={300} />
    </AnalyticsContainer>
  );
}

export default Analytics;
