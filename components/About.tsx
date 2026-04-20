export default function About() {
  const skills = [
    "UX Design",
    "Product Design",
    "Design Systems",
    "Prototyping",
    "React / Next.js",
    "User Research",
    "Interaction Design",
    "TypeScript",
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
              About
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight mb-8">
              Design meets
              <br />
              engineering.
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                I&apos;m Mariana Seferin, a Design Engineer based in Brazil. I specialize in creating digital products that live at the intersection of thoughtful design and clean code.
              </p>
              <p>
                With a background spanning UX strategy, visual design, and front-end development, I bring a holistic perspective to every project — from initial research through to pixel-perfect implementation.
              </p>
              <p>
                I believe the best products are born from deep collaboration, curiosity, and a relentless focus on the people who use them.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="lg:pt-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
              Skills & Tools
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 rounded-full hover:border-black hover:text-black transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { value: "6+", label: "Years of experience" },
                { value: "40+", label: "Projects delivered" },
                { value: "15+", label: "Happy clients" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-black">{value}</p>
                  <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
