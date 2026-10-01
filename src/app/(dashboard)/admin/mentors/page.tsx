"use client";
import { useGetAllMentorsAdmin } from "@/hooks/mentor.hook";
import React from "react";

const MentorsPage = () => {
  const { data: mentors, isPending } = useGetAllMentorsAdmin();

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return <div>this is mentors MentorsPage</div>;
};

export default MentorsPage;
