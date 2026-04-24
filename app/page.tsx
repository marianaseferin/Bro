import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Waypoint from "@/components/Waypoint";
import Feedback from "@/components/Feedback";
import About from "@/components/About";
import Resume from "@/components/Resume";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Waypoint number="02" />
      <Feedback />
      <About />
      <Waypoint number="04" />
      <Resume />
      <CTA />
      <Footer />
    </>
  );
}
