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
  issue: any;
}

export async function getStaticPaths() {
  // Fetch a list of issue IDs to pre-render at build time
  const issues = await prisma.issue.findMany({
    select: { id: true },
  });

  const paths = issues.map((issue) => ({
    params: { id: issue.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", // This can be 'true', 'false', or 'blocking'
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const issueId = parseInt(params.id, 10);

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
    revalidate: 10, // Set revalidation interval in seconds (optional)
  };
}

const EditIssuePage = ({ issue }: Props) => {
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
