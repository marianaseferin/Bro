export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-img"></div>
      <div className="hero-grain"></div>

      <svg
        className="trail"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" />
          </filter>
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

      <div className="trail">
        <div className="dot summit" style={{ left: "49.5%", top: "14%", animationDelay: "0s" }}></div>
        <div className="dot" style={{ left: "46%", top: "27%", animationDelay: "0.3s" }}></div>
        <div className="dot" style={{ left: "43%", top: "42%", animationDelay: "0.6s" }}></div>
        <div className="dot" style={{ left: "39%", top: "58%", animationDelay: "0.9s" }}></div>
        <div className="dot" style={{ left: "36%", top: "74%", animationDelay: "1.2s" }}></div>
        <div className="dot" style={{ left: "33%", top: "88%", animationDelay: "1.5s" }}></div>
      </div>

      <div className="hero-inner">
        <div>
          <div
            className="hero-sub"
            style={{ fontSize: "21.5px", margin: "-9px -6px 0px 0px" }}
          >
            Senior UX / UI · Product Designer
          </div>
          <h1
            className="hero-title"
            style={{ letterSpacing: "2.2px", lineHeight: 0.95, fontSize: "165px", margin: "0px 0px 21px" }}
          >
            Mariana
            <span className="and">
              <span></span>
            </span>
            {"   "}Seferin
          </h1>
          <p className="hero-intro" style={{ width: "505px" }}>
            Explorer at heart, designer by craft. Over the past 12 years, I&apos;ve
            been navigating complex landscapes across product, service, and visual
            design — using systems thinking to uncover direction, simplify the
            journey, and build solutions that truly resonate.
          </p>
          <div className="hero-meta">
            <div className="meta-item">
              Based in <b>Malta · EU</b>
            </div>
            <div className="meta-item">
              Experience <b>12+ years</b>
            </div>
            <div className="meta-item">
              Availability <b>Open to roles</b>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint">Begin the ascent · scroll</div>
      <div className="altitude">
        Altitude<b>00 · Summit</b>
      </div>
    </section>
  );
}
