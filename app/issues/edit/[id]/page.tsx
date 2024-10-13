import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  // Debug: Ensure params are available in deployment
  if (!params || !params.id) {
    console.error("Error: params or params.id is missing");
    return notFound(); // Return 404 if params are missing
  }

  const issueId = parseInt(params.id, 10); // Ensure id is parsed as an integer

  // Debug: Log the issueId being passed
  console.log("Parsed issueId in deployment:", issueId);

  if (isNaN(issueId)) {
    console.error("Invalid issueId:", issueId); // Log if issueId is NaN
    return notFound(); // Return 404 if issueId is invalid
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: issueId, // Ensure the correct id is passed to Prisma
      },
    });

    if (!issue) {
      console.error("Issue not found for id:", issueId); // Log if issue not found
      return notFound(); // Return 404 if no issue is found
    }

    return <IssueForm issue={issue} />;
  } catch (error) {
    console.error("Error fetching issue during deployment:", error); // Log any errors that happen during Prisma fetch
    return notFound(); // Return 404 in case of unexpected error
  }
};

export default EditIssuePage;
