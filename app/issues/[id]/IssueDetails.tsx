import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkDown from "react-markdown";
const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Heading> {issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge Status={issue.Status} />
        <Text>{issue.createdAt.toDateString()} </Text> 
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </div>
  );
};

export default IssueDetails;
