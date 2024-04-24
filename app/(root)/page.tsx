import AboutSection from "@/components/AboutSection/AboutSection";
import ArticlesSection from "@/components/ArticlesSection/ArticlesSection";
import GuidesSection from "@/components/GuidesSection/GuideSection";
import LandingSection from "@/components/LandingSection/LandingSection";
import { getAboutSection, getLatestPosts } from "@/sanity/lib/sanity.fetch";

export default async function Home() {

  const posts = await getLatestPosts();
  const about = await getAboutSection().then((data) => data[0]);
  
  return (
    <>
      <main>
        <LandingSection />
        <AboutSection data={about} />
        <ArticlesSection posts={posts} />
        <GuidesSection />
      </main>
    </>
  )
}

export const revalidate = 60;