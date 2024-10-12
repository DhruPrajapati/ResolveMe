import Image from 'next/image'
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueChart from './IssueChart';

export default async function Home() {
  const open = await prisma.issue.count({ where: { Status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { Status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { Status: "CLOSED" } });
  return <IssueChart open={open} inProgress={inProgress} closed={closed} />;
}
