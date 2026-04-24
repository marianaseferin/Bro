const jobs = [
  {
    past: false,
    role: "UX/UI Designer",
    company: "EPG Financial Services Ltd.",
    period: "Jun 2024 — Present · Sliema, Malta · Hybrid",
    items: [
      "Design user-centered solutions for B2B desktop, B2C mobile e-wallet, and Backoffice applications — ensuring seamless cross-platform experiences.",
      "Create and maintain comprehensive design systems that promote consistency, scalability, and efficiency.",
      "Lead redesign initiatives, modernizing interfaces and aligning them with user context and needs.",
      "Develop intuitive, visually compelling dashboards for data analysis to enhance decision-making.",
      "Design engaging and effective advertising materials to support marketing campaigns.",
    ],
  },
  {
    past: true,
    role: "Squad Leader & Strategic Product Designer",
    company: "Bradesco Seguros via MJV Tecnologia e Inovação",
    period: "Mar 2022 — Jun 2024 · Curitiba, BR · Remote",
    items: [
      "Led conceptual design projects for the largest insurance company in Latin America, working closely with the UX Strategy squad.",
      "Facilitated co-creative workshops, capturing project inputs through creative stimulation and engagement.",
      "Owned comprehensive information architecture, customer journeys, and wireframes.",
      "Managed whole design conceptual projects (MDP) focused on the ideal user journey experience.",
      "Mentored trainees and junior designers; conducted moderated remote usability testing and contextual inquiry.",
    ],
  },
  {
    past: true,
    role: "Graphic & UI Designer",
    company: "Estúdio A Hora (prev. Plural Comunicação Integrada)",
    period: "Feb 2018 — Mar 2022 · Lajeado, BR · Hybrid / Remote",
    items: [
      "Graphic and communication design solutions across a wide range of general projects.",
      "Information architecture, customer journeys, and wireframes.",
      "Website UI design; visual content for social media.",
      "Creation of brands, visual identity systems, printed materials and advertising.",
    ],
  },
  {
    past: true,
    role: "Professor · Graphic Design Technology",
    company: "Universidade La Salle",
    period: "Feb 2013 — Dec 2016 · Feb 2019 — Jul 2020 · Canoas, BR",
    items: [
      "Taught Graphic Design I, Surface Design, Visual Communication, Graphic Analysis, Color Study, History of Design, and Plastic Composition.",
    ],
  },
  {
    past: true,
    role: "Service Designer & Art Director",
    company: "Lirial Digital Solutions",
    period: "Oct 2014 — Mar 2018 · Canoas, BR",
    items: [
      "Creative direction across visual identities and product experiences.",
      "User experience design for mobile applications, applying service design to digital interfaces.",
      "Visual content for social media and illustration.",
    ],
  },
];

export default function Resume() {
  return (
    <section className="resume" id="resume">
      <div className="wrap">
        <div className="section-head">
          <div className="section-index">§ 04 / Ledger</div>
          <h2 className="section-title">
            Rooted.
            <br />
            Intentional.
            <br />
            Evolving.
          </h2>
          <div className="section-sub">
            Senior UX/UI Product Designer — a holistic, systems-driven approach to
            product design.
          </div>
        </div>

        <div className="resume-grid">
          <aside className="resume-sidebar">
            <h5>Education</h5>
            <div className="edu">
              <div>
                <b>Master&apos;s in Design and Technology</b>
                <small>UFRGS · Porto Alegre, BR · 2010–2012</small>
              </div>
              <div>
                <b>Bachelor&apos;s in Visual Arts</b>
                <small>UFRGS · Porto Alegre, BR · 2003–2007</small>
              </div>
            </div>

            <h5>Core Skills</h5>
            <ul>
              <li>UX/UI, Design Systems, Product</li>
              <li>Information architecture &amp; flows</li>
              <li>User research &amp; usability testing</li>
              <li>Workshop facilitation &amp; discovery</li>
              <li>Mentorship &amp; design leadership</li>
              <li>Figma · Claude · Miro · Adobe CS</li>
            </ul>

            <h5>Personal Qualities</h5>
            <ul>
              <li>Strategic, systems-driven thinker</li>
              <li>Hands-on, pragmatic problem solver</li>
              <li>Bridges vision, UX, and business</li>
              <li>Confident communicator &amp; mentor</li>
              <li>Future-focused, sustainable mindset</li>
            </ul>
          </aside>

          <div className="timeline">
            {jobs.map((job) => (
              <div className={`job${job.past ? " past" : ""}`} key={job.company}>
                <div className="role">{job.role}</div>
                <div className="company">{job.company}</div>
                <div className="period">{job.period}</div>
                <ul>
                  {job.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
