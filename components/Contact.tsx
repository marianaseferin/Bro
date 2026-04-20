export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
              Contact
            </p>
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Let&apos;s build
              <br />
              something
              <br />
              <span className="italic font-light text-gray-300">great together.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Whether you have a project in mind, want to collaborate, or just want to say hello — my inbox is always open.
            </p>
            <div className="mt-10 flex flex-col gap-3">
              <a
                href="mailto:mariana@example.com"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                mariana@example.com
              </a>
              <div className="flex gap-6 mt-2">
                {["LinkedIn", "GitHub", "Dribbble"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-gray-400 block mb-2">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 block mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400 block mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="jane@company.com"
                className="w-full h-12 bg-white/5 border border-white/10 rounded-lg px-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400 block mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Send message →
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © 2026 Mariana Seferin. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Design Engineer · Brazil
          </p>
        </div>
      </div>
    </section>
  );
}
