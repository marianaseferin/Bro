import './Feedback.css';

const testimonials = [
  {
    name: 'Debora Dosso',
    role: 'Head of Innovation · MJV Innovation',
    avatar: '/assets/avatar-debora.jpg',
    initials: 'DD',
    quote: '"As an employee, Mariana was always committed, assertive and plays a natural leadership role, highlighting the team\'s positive points. During her time in my team, she managed different projects within the design thinking approach, placing the user at the center of the process. Mariana is a delight to work with — I wouldn\'t hesitate to hire her again."',
  },
  {
    name: 'Marcelo Demilis',
    role: 'Ph.D. in Design · Sr. Service Designer, MJV',
    avatar: '/assets/avatar-marcelo.jpg',
    initials: 'MD',
    quote: '"Mariana is a creative and curious leader with a strong systems view, always eager to learn and innovate. She collaborates deeply and skillfully combines tools and methods to drive meaningful solutions, and is an excellent mentor who empowers people and encourages their strengths."',
  },
  {
    name: 'Benjamin Nyaoro',
    role: 'Product Owner · Euro Payment Group',
    avatar: '/assets/avatar-ben.jpg',
    initials: 'BN',
    quote: '"Mariana is one of the strongest UX designers I\'ve worked with. She is sharp, creative, and approaches challenges with a calm and thoughtful mindset. She consistently transforms complex problems into simple, elegant solutions and collaborates exceptionally well with cross-functional teams."',
  },
  {
    name: 'Camilla Moura',
    role: 'UX Lead · Bradesco Seguros',
    avatar: '/assets/avatar-camilla.jpg',
    initials: 'CM',
    quote: '"Mariana Seferin was always promoting a creative environment focused on user experience balanced with the business goals. During her time in my team, she managed to deliver an end-to-end cycle for a relevant digital insurance product."',
  },
];

export default function Feedback() {
  return (
    <section className="feedback-band" id="voices">
      <div className="feedback-head">
        <div className="section-index">§ 02 / Voices</div>
        <h2 className="section-title">Expert<br />Feedback</h2>
        <div className="section-sub">
          Insights and praises from leaders and peers who have guided and witnessed my professional growth.
        </div>
      </div>

      <div className="testimonials">
        {testimonials.map((t) => (
          <article className="testimonial" key={t.name}>
            <div className="t-person">
              <div
                className="t-avatar"
                style={{
                  backgroundImage: `url('${t.avatar}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {t.initials}
              </div>
              <div>
                <div className="t-name">{t.name}</div>
                <div className="t-role">{t.role}</div>
              </div>
            </div>
            <p className="t-quote">{t.quote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
