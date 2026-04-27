import './index.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Feedback from './components/Feedback';
import About from './components/About';
import Resume from './components/Resume';
import CTA from './components/CTA';
import Footer from './components/Footer';

function Waypoint({ label }) {
  return (
    <div className="waypoint">
      <span>{label}</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Projects />
      <Waypoint label="Waypoint · 02" />
      <Feedback />
      <About />
      <Waypoint label="Waypoint · 04" />
      <Resume />
      <CTA />
      <Footer />
    </>
  );
}
