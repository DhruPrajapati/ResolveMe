import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";


const LoadingNewIssuePage = () => {
  return (
    <Box className="max-h-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
