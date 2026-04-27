import './Footer.css';

const smoothTo = (id) => (e) => {
  e.preventDefault();
  const el = document.querySelector(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer>
      <div className="foot">
        <div className="foot-brand">Mariana Seferin</div>
        <div className="foot-links">
          <a href="#work"    onClick={smoothTo('#work')}>Projects</a>
          <a href="#resume"  onClick={smoothTo('#resume')}>Resume</a>
          <a href="#about"   onClick={smoothTo('#about')}>About</a>
          <a href="#contact" onClick={smoothTo('#contact')}>Contact</a>
        </div>
        <div className="foot-copy">© 2026 · Base camp, Malta</div>
      </div>
    </footer>
  );
}
