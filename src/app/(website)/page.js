import Image from "next/image";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import History from "@/components/sections/History";
import Publications from "@/components/sections/Publications";
import Contact from "@/components/sections/Contact";
import Activity from "@/components/sections/Activity";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Activity />
      <History />
      <Publications />
      <Contact />
    </>
  );
}
