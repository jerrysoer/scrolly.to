import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import OpenSource from "@/components/OpenSource";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Gallery />
      <OpenSource />
      <Waitlist />
      <Footer />
    </>
  );
}
