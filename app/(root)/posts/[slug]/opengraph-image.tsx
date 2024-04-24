/* eslint-disable @next/next/no-img-element */
import { cinzel } from "@/fonts";
import { getPostBySlug } from "@/sanity/lib/sanity.fetch";
import { ImageResponse } from "next/og";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "CARMI AROUND | Blog";
export const contentType = "image/png";

export const runtime = 'edge'

export default async function og({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  if(!slug) return
  const post = await getPostBySlug(slug).then((posts) => posts[0]);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1"
            src={post?.coverImage}
            alt={post?.title_en!!}
            height={size.height}
            width={size.width}
            style={{objectFit: "cover"}}
          />
          {/* Overlay */}
          {/* <div tw="absolute flex inset-0 bg-black bg-opacity-50" /> */}
        </div>
        {/* <div tw="flex flex-col text-neutral-50 items-center justify-center">
          <div tw={`${cinzel.className} text-6xl font-bold`}>{post?.title_en}</div>
        </div> */}
      </div>
    ),
    size
  );
}