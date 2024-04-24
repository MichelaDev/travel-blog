import React from "react";
import BlogPage from "@/components/Blog/BlogPage";
import { getTags } from "@/sanity/lib/sanity.fetch";

export default async function Blog() {
  const tags = await getTags();

  return (
    <BlogPage tags={tags} />
  )
};

export const revalidate = 60;
