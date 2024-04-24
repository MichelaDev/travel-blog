import { getAllPostSlugs } from '@/sanity/lib/sanity.fetch'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.carmiaround.com"

  const postSlugs = await getAllPostSlugs();
  const postPages = postSlugs?.map((slug) => {
    return {
      url: `${baseUrl}/posts/${slug.slug}`,
      lastModified: new Date(),
    }
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postPages
  ]
}