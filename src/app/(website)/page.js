import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import History from "@/components/sections/History";
import Publications from "@/components/sections/Publications";
import Contact from "@/components/sections/Contact";
import Activity from "@/components/sections/Activity";
import { getHomepageContent } from "@/lib/public-data";

export default async function Home() {
  const content = await getHomepageContent();

  return (
    <>
      <Hero data={content.hero} />
      <About data={content.about} />
      <Activity data={content.activity} />
      <History data={content.history} />
      <Publications posts={content.posts} />
      <Contact data={content.contact} settings={content.settings} />
    </>
  );
}
