import React from "react";
import { getAllPostSlugs, getPostBySlug, getPostMeta } from "@/sanity/lib/sanity.fetch";
import SinglePost from "@/components/Post/Post";
import { Metadata } from "next";
import moment from "moment";

type Props = {
  params: { slug: string };
};

export const generateMetadata = async (
  props: Props
): Promise<Metadata> => {
  const { params } = props
  try {
    const post = await getPostMeta(params.slug).then((posts) => posts[0]);
    if(!post) {
      return {
        title: "Not found",
        description: "Page was not found"
      };
    }
    return {
      title: post.title_en,
      description: post.summary,
      alternates: {
        canonical: `/posts/${params.slug}`,
        languages: {
          "en-US": `/en-US/posts/${params.slug}`,
          "it-IT": `/it-IT/posts/${params.slug}`
        }
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title_en,
        description: post.summary,
        siteId: '1467726470533754880',
        creator: '@carmi',
        creatorId: '1467726470533754880',
        images: ['https://nextjs.org/og.webp'],
      },
      openGraph: {
        title: post.title_en,
        description: post.summary,
        type: 'article',
        publishedTime: moment(post.publishedAt).format(),
        authors: ['Carmi'],
      },
    };
  } catch(err) {
    console.warn(err)
    return {
      title: "Not found",
      description: "Page was not found"
    };
  }
};

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }: { params: { slug: string }}) {
  const { slug } = params
  const post = await getPostBySlug(slug).then((posts) => posts[0]);
  return (
    <SinglePost post={post} />
  )
};

export const revalidate = 60;
