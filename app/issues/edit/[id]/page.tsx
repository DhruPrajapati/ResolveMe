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

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const issueId = parseInt(params.id, 10);

  if (isNaN(issueId)) {
    return { notFound: true };
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return { notFound: true };
  }

  return {
    props: {
      issue,
    },
  };
}

const EditIssuePage = ({ issue }: { issue: any }) => {
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
