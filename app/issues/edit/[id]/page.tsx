import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
   loading:() => <IssueFormSkeleton />
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  // Ensure params.id is a valid number
  const issueId = parseInt(params.id, 10);

  if (isNaN(issueId)) {
    return notFound(); // Return 404 if issueId is not a valid number
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });

  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
