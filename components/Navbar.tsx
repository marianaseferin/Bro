"use client";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const sections = ["work", "resume", "about"].map((id) =>
      document.getElementById(id)
    );
    const links = linksRef.current;

    const onScroll = () => {
      const y = window.scrollY + 120;
      let active = 0;
      sections.forEach((s, i) => {
        if (s && s.offsetTop <= y) active = i;
      });
      links.forEach((l, i) => {
        if (l) l.classList.toggle("active", i === active);
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const y =
        target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="nav">
      <a className="nav-brand" href="#top" onClick={handleClick("#top")}>
        Mariana Seferin
      </a>
      <nav className="nav-links">
        <a
          href="#work"
          ref={(el) => { if (el) linksRef.current[0] = el; }}
          onClick={handleClick("#work")}
          className="active"
        >
          Projects
        </a>
        <a
          href="#resume"
          ref={(el) => { if (el) linksRef.current[1] = el; }}
          onClick={handleClick("#resume")}
        >
          Resume
        </a>
        <a
          href="#about"
          ref={(el) => { if (el) linksRef.current[2] = el; }}
          onClick={handleClick("#about")}
        >
          About
        </a>
      </nav>
      <a
        className="nav-cv"
        href="https://drive.google.com/drive/folders/1FvF5FU5Z-aQLGWMkELtMgOmAzzflsQ9-"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="dot"></span> Download CV
      </a>
    </header>
  );
}
