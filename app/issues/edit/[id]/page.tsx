import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Issue } from "@prisma/client";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  issue: Issue;
}

export async function getStaticPaths() {
  const issues = await prisma.issue.findMany();
  const paths = issues.map((issue) => ({
    params: { id: issue.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", // Ensures the page waits for the issue data
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return { notFound: true };
  }

  return {
    props: { issue },
  };
}

const EditIssuePage = ({ issue }: Props) => {
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
