import Image from "next/image";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Achievements from "@/components/sections/Achievements";
import Ventures from "@/components/sections/Ventures";
import Contact from "@/components/sections/Contact";
import KeyFocus from "@/components/sections/KeyFocus";

export default function Home() {
  return (
    <>
      <Hero />
      <KeyFocus />
      <Ventures />
      <About />
      <Achievements />
      <Contact />
    </>
  );
}
