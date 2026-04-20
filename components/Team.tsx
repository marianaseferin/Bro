import Image from "next/image";

const team = [
  {
    name: "Mariana Seferin",
    role: "Design Engineer",
    image: "/images/hero.jpg",
    objectPosition: "object-[center_20%]",
  },
  {
    name: "Team Member",
    role: "UX Researcher",
    image: "/images/team-1.jpg",
    objectPosition: "object-center",
  },
  {
    name: "Team Member",
    role: "Product Designer",
    image: "/images/team-2.jpg",
    objectPosition: "object-center",
  },
  {
    name: "Team Member",
    role: "Front-end Developer",
    image: "/images/team-3.jpg",
    objectPosition: "object-center",
  },
  {
    name: "Team Member",
    role: "Creative Director",
    image: "/images/team-4.jpg",
    objectPosition: "object-center",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
            The Team
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight">
            People behind
            <br />
            the work.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member) => (
            <div key={`${member.name}-${member.role}`} className="group">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={`object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${member.objectPosition}`}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
              <h3 className="text-sm font-semibold text-black">{member.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
