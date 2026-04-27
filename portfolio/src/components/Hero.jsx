import './Hero.css';

const HERO_IMG = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2400&q=80';

const trailDots = [
  { style: { left: '49.5%', top: '14%' },  animationDelay: '0s',   cls: 'summit' },
  { style: { left: '46%',   top: '27%' },  animationDelay: '0.3s', cls: '' },
  { style: { left: '43%',   top: '42%' },  animationDelay: '0.6s', cls: '' },
  { style: { left: '39%',   top: '58%' },  animationDelay: '0.9s', cls: '' },
  { style: { left: '36%',   top: '74%' },  animationDelay: '1.2s', cls: '' },
  { style: { left: '33%',   top: '88%' },  animationDelay: '1.5s', cls: '' },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-img" style={{ backgroundImage: `url("${HERO_IMG}")` }} />
      <div className="hero-grain" />

      {/* Trail SVG */}
      <svg className="trail-svg" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <path
          d="M 792 126 L 736 243 L 688 378 L 624 522 L 576 666 L 528 792"
          stroke="rgba(211,197,4,0.375)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Trail dots */}
      <div className="trail-dots" aria-hidden="true">
        {trailDots.map((d, i) => (
          <div
            key={i}
            className={`dot${d.cls ? ' summit' : ''}`}
            style={{ ...d.style, animationDelay: d.animationDelay }}
          />
        ))}
      </div>

      <div className="hero-inner">
        <div>
          <div className="hero-sub">Senior UX / UI · Product Designer</div>
          <h1 className="hero-title">
            Mariana
            <span className="and"><span /></span>
            Seferin
          </h1>
          <p className="hero-intro">
            Explorer at heart, designer by craft. Over the past 12 years, I've been navigating complex landscapes across product, service, and visual design — using systems thinking to uncover direction, simplify the journey, and build solutions that truly resonate.
          </p>
          <div className="hero-meta">
            <div className="meta-item">Based in <b>Malta · EU</b></div>
            <div className="meta-item">Experience <b>12+ years</b></div>
            <div className="meta-item">Availability <b>Open to roles</b></div>
          </div>
        </div>
      </div>

      <div className="scroll-hint">Begin the ascent · scroll</div>
      <div className="altitude">Altitude<b>00 · Summit</b></div>
    </section>
  );
}
