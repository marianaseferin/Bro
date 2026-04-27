import './CTA.css';

const CTA_IMG = 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=2400&q=80';

export default function CTA() {
  return (
    <section
      className="cta"
      id="contact"
      style={{ backgroundImage: `url("${CTA_IMG}")` }}
    >
      <div className="cta-inner">
        <h2>Let's climb<br />together.</h2>
        <p>Interested in connecting? Let's talk projects, collaborations, or anything design.</p>
        <a
          className="btn"
          href="https://api.whatsapp.com/qr/SYDFWU5GR6OTN1?autoload=1&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a call <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
