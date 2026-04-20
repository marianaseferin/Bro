const projects = [
  {
    id: "01",
    title: "BroVeggie",
    category: "Product Design · Mobile",
    description:
      "A platform that helps users transition to plant-based diets by reducing the friction of daily food decisions. From discovery to a fully-shipped MVP in 2 weeks.",
    tags: ["UX Research", "Product Strategy", "Mobile", "React Native"],
    year: "2026",
    color: "bg-[#f0ede8]",
  },
  {
    id: "02",
    title: "Design System 2.0",
    category: "Design Systems · Web",
    description:
      "Built a comprehensive, scalable design system from the ground up — tokens, components, documentation and governance — used across 3 product teams.",
    tags: ["Design Systems", "Figma", "Storybook", "TypeScript"],
    year: "2025",
    color: "bg-[#e8edf0]",
  },
  {
    id: "03",
    title: "Taskflow",
    category: "Product Design · SaaS",
    description:
      "End-to-end redesign of a project management SaaS, reducing onboarding time by 40% and increasing daily active usage through improved information architecture.",
    tags: ["SaaS", "UX Design", "User Research", "Next.js"],
    year: "2025",
    color: "bg-[#eee8f0]",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24 lg:py-32 bg-[#f8f8f6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
              Selected Work
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight">
              Projects that
              <br />
              made a difference.
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden lg:inline-flex text-sm font-medium text-gray-500 hover:text-black transition-colors underline underline-offset-4"
          >
            See all work →
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`${project.color} rounded-2xl p-8 flex flex-col justify-between min-h-[420px] group cursor-pointer hover:scale-[1.02] transition-transform duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold text-gray-400 tracking-widest">
                    {project.id}
                  </span>
                  <span className="text-xs text-gray-400">{project.year}</span>
                </div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  {project.category}
                </p>
                <h3 className="text-2xl font-bold text-black mb-4">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/60 text-xs font-medium text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
