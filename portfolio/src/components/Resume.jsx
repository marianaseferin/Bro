import './Resume.css';

const skills = [
  'UX/UI, Design Systems, Product',
  'Information architecture & flows',
  'User research & usability testing',
  'Workshop facilitation & discovery',
  'Mentorship & design leadership',
  'Figma · Claude · Miro · Adobe CS',
];

const qualities = [
  'Strategic, systems-driven thinker',
  'Hands-on, pragmatic problem solver',
  'Bridges vision, UX, and business',
  'Confident communicator & mentor',
  'Future-focused, sustainable mindset',
];

const jobs = [
  {
    current: true,
    role: 'UX/UI Designer',
    company: 'EPG Financial Services Ltd.',
    period: 'Jun 2024 — Present · Sliema, Malta · Hybrid',
    bullets: [
      'Design user-centered solutions for B2B desktop, B2C mobile e-wallet, and Backoffice applications — ensuring seamless cross-platform experiences.',
      'Create and maintain comprehensive design systems that promote consistency, scalability, and efficiency.',
      'Lead redesign initiatives, modernizing interfaces and aligning them with user context and needs.',
      'Develop intuitive, visually compelling dashboards for data analysis to enhance decision-making.',
      'Design engaging and effective advertising materials to support marketing campaigns.',
    ],
  },
  {
    role: 'Squad Leader & Strategic Product Designer',
    company: 'Bradesco Seguros via MJV Tecnologia e Inovação',
    period: 'Mar 2022 — Jun 2024 · Curitiba, BR · Remote',
    bullets: [
      'Led conceptual design projects for the largest insurance company in Latin America, working closely with the UX Strategy squad.',
      'Facilitated co-creative workshops, capturing project inputs through creative stimulation and engagement.',
      'Owned comprehensive information architecture, customer journeys, and wireframes.',
      'Managed whole design conceptual projects (MDP) focused on the ideal user journey experience.',
      'Mentored trainees and junior designers; conducted moderated remote usability testing and contextual inquiry.',
    ],
  },
  {
    role: 'Graphic & UI Designer',
    company: 'Estúdio A Hora (prev. Plural Comunicação Integrada)',
    period: 'Feb 2018 — Mar 2022 · Lajeado, BR · Hybrid / Remote',
    bullets: [
      'Graphic and communication design solutions across a wide range of general projects.',
      'Information architecture, customer journeys, and wireframes.',
      'Website UI design; visual content for social media.',
      'Creation of brands, visual identity systems, printed materials and advertising.',
    ],
  },
  {
    role: 'Professor · Graphic Design Technology',
    company: 'Universidade La Salle',
    period: 'Feb 2013 — Dec 2016 · Feb 2019 — Jul 2020 · Canoas, BR',
    bullets: [
      'Taught Graphic Design I, Surface Design, Visual Communication, Graphic Analysis, Color Study, History of Design, and Plastic Composition.',
    ],
  },
  {
    role: 'Service Designer & Art Director',
    company: 'Lirial Digital Solutions',
    period: 'Oct 2014 — Mar 2018 · Canoas, BR',
    bullets: [
      'Creative direction across visual identities and product experiences.',
      'User experience design for mobile applications, applying service design to digital interfaces.',
      'Visual content for social media and illustration.',
    ],
  },
];

export default function Resume() {
  return (
    <section className="resume" id="resume">
      <div className="wrap">
        <div className="section-head">
          <div className="section-index">§ 04 / Ledger</div>
          <h2 className="section-title">Rooted.<br />Intentional.<br />Evolving.</h2>
          <div className="section-sub">
            Senior UX/UI Product Designer — a holistic, systems-driven approach to product design.
          </div>
        </div>

        <div className="resume-grid">
          <aside className="resume-sidebar">
            <h5>Education</h5>
            <div className="edu">
              <div>
                <b>Master's in Design and Technology</b>
                <small>UFRGS · Porto Alegre, BR · 2010–2012</small>
              </div>
              <div>
                <b>Bachelor's in Visual Arts</b>
                <small>UFRGS · Porto Alegre, BR · 2003–2007</small>
              </div>
            </div>

            <h5>Core Skills</h5>
            <ul>
              {skills.map((s) => <li key={s}>{s}</li>)}
            </ul>

            <h5>Personal Qualities</h5>
            <ul>
              {qualities.map((q) => <li key={q}>{q}</li>)}
            </ul>
          </aside>

          <div className="timeline">
            {jobs.map((job) => (
              <div className={`job${job.current ? '' : ' past'}`} key={job.role}>
                <div className="role">{job.role}</div>
                <div className="company">{job.company}</div>
                <div className="period">{job.period}</div>
                <ul>
                  {job.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
