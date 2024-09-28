import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const LoadingIssueDetail = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="2">
        <Skeleton width="5rem" />
        <Text>
          <Skeleton width="8rem" />
        </Text>
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetail;
