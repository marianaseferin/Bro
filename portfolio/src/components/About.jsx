import './About.css';

const interests = [
  { n: 'I.',    text: 'Nature and hiking, observing patterns, systems, and landscapes.' },
  { n: 'II.',   text: 'Meditation and reflective practices that cultivate clarity and awareness.' },
  { n: 'III.',  text: 'Travel and cultural exploration through design, architecture, and visual identity.' },
  { n: 'IV.',   text: 'Art history and design history, studying the evolution of form and function.' },
  { n: 'V.',    text: 'Handcraft, weaving, and artistic experimentation with texture and materiality.' },
  { n: 'VI.',   text: 'Mentorship and building strong, collaborative design cultures.' },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="section-head">
          <div className="section-index">§ 03 / The Explorer</div>
          <h2 className="section-title">Who I am<br />beyond design</h2>
          <div className="section-sub">
            Guided by awareness and intention — designing experiences that balance structure and sensitivity.
          </div>
        </div>

        <div className="about-hero">
          <div className="about-portrait">
            <div className="tag">Currently<b>St. Julian's, MT</b></div>
          </div>
          <div className="about-text">
            <p className="lede">
              My work is shaped not only by design principles and strategy, but by the experiences that ground me — nature, meditation, travel, art, history, and handcraft.
            </p>
            <p>
              Nature teaches me perspective. Meditation teaches me clarity. Handcraft teaches me patience and structure. Art history reminds me that every creation carries context and intention. These influences shape the way I approach design — as interconnected systems where details and the bigger picture must work in harmony.
            </p>
            <p>
              I believe meaningful design emerges from thoughtful observation and empathy. I'm driven to transform complexity into clarity, creating experiences that are intuitive, trustworthy, and purposeful. My work balances analytical rigor with creative exploration, ensuring that solutions are both scalable and emotionally resonant.
            </p>
            <div className="compass">
              <div>Perspective <b>Nature</b></div>
              <div>Clarity <b>Meditation</b></div>
              <div>Structure <b>Handcraft</b></div>
              <div>Context <b>Art | Design History</b></div>
            </div>
          </div>
        </div>

        <div className="interests">
          <h4>Looking<br />ahead.</h4>
          <div>
            <p className="interests-lede">
              As a designer, I aim to contribute beyond execution — shaping product vision, influencing strategic direction, and strengthening design maturity within organizations. Leadership, for me, means enabling others to thrive. My focus is on designing sustainable, future-ready systems — experiences that evolve intentionally with people, business, and technology.
            </p>
            <div className="interests-list">
              {interests.map((item) => (
                <div key={item.n} data-n={item.n}>{item.text}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
