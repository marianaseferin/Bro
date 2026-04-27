import { useEffect, useState } from 'react';
import './Nav.css';

export default function Nav() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const sections = ['work', 'resume', 'about'].map(id => document.getElementById(id));
    const onScroll = () => {
      const y = window.scrollY + 120;
      let active = 0;
      sections.forEach((s, i) => { if (s && s.offsetTop <= y) active = i; });
      setActiveIdx(active);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothTo = (id) => (e) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
  };

  return (
    <header className="nav">
      <a className="nav-brand" href="#top" onClick={smoothTo('#top')}>Mariana Seferin</a>
      <nav className="nav-links">
        <a href="#work"   onClick={smoothTo('#work')}   className={activeIdx === 0 ? 'active' : ''}>Projects</a>
        <a href="#resume" onClick={smoothTo('#resume')} className={activeIdx === 1 ? 'active' : ''}>Resume</a>
        <a href="#about"  onClick={smoothTo('#about')}  className={activeIdx === 2 ? 'active' : ''}>About</a>
      </nav>
      <a
        className="nav-cv"
        href="https://drive.google.com/drive/folders/1FvF5FU5Z-aQLGWMkELtMgOmAzzflsQ9-"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="dot" /> Download CV
      </a>
    </header>
  );
}
