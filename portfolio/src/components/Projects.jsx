import './Projects.css';

const projects = [
  {
    num: '01',
    tag: 'Fintech · Mobile',
    title: 'Paylado Wallet — Experience Evolution & Design Maturity',
    desc: 'Redesigning a digital wallet to strengthen trust, modernize perception, and create a scalable foundation for fintech growth.',
    href: 'projects/paylado-wallet.html',
    img: '/assets/paylado-1.jpg',
    alt: 'Paylado Wallet mockup',
    coord: '46.5°N · 11.8°E',
  },
  {
    num: '02',
    tag: 'Enterprise · Ops Platform',
    title: 'BackOffice Redesign — From Technical Tool to Operational Intelligence',
    desc: 'Redesigning a BackOffice platform to streamline operations, enhance data visualization, and ensure regulatory compliance — from in-depth research to full-system transformation.',
    href: 'projects/backoffice-platform.html',
    img: '/assets/psd-3-copy.jpg',
    alt: 'Paylado BackOffice dashboard',
    coord: '47.2°N · 10.9°E',
  },
  {
    num: '03',
    tag: 'Insurance · Web',
    title: 'Redesigning the Institutional Insurance Portal to Drive Growth',
    desc: 'Designing a high-performing institutional home that balances brand authority, multi-audience navigation, and measurable sales growth.',
    href: 'projects/insurance-website-redesign.html',
    img: '/assets/project-3.jpg',
    alt: 'Bradesco Seguros portal redesign',
    coord: '45.9°N · 07.6°E',
  },
  {
    num: '04',
    tag: 'Financial · Product Strategy',
    title: 'Repositioning Personal Pension as a Goal-Driven Product',
    desc: 'Designing a pension experience that shifts from a financial obligation to a personal future strategy — grounded in meaning, agency, and clarity.',
    href: 'projects/personal-pension.html',
    img: '/assets/pp-1.jpg',
    alt: 'Personal pension concept diagram',
    coord: '62.1°N · 07.2°E',
  },
];

export default function Projects() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="section-head">
          <div className="section-index">§ 01 / Ascent</div>
          <h2 className="section-title">Selected<br />Projects</h2>
          <div className="section-sub">
            Dedication to innovative and heartfelt design — carried across fintech, insurance, and service systems.
          </div>
        </div>

        <div className="projects">
          {projects.map((p) => (
            <article className="project" key={p.num}>
              <div className="project-num">{p.num}</div>
              <div className="project-info">
                <span className="project-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <a className="project-cta" href={p.href}>
                  See the project <span className="arrow">→</span>
                </a>
              </div>
              <div className="project-visual">
                <img src={p.img} alt={p.alt} />
                <div className="overlay" />
                <div className="coord">{p.coord}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
