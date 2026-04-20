import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Mariana Seferin"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28">
        <div className="max-w-3xl">
          <p className="text-white/70 text-sm tracking-widest uppercase mb-4 font-medium">
            Design Engineer
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Crafting digital
            <br />
            experiences that
            <br />
            <span className="italic font-light">matter.</span>
          </h1>
          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
            I bridge the gap between design and engineering — creating products that are both beautiful and functional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#work"
              className="inline-flex h-12 items-center justify-center px-8 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center px-8 border border-white/50 text-white text-sm font-medium rounded-full hover:border-white hover:bg-white/10 transition-colors"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs tracking-widest uppercase rotate-90 origin-center">Scroll</span>
        <div className="w-px h-12 bg-white/30" />
      </div>
    </section>
  );
}
