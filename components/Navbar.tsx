"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link href="#home" className="text-sm font-semibold tracking-widest uppercase text-black">
          Mariana Seferin
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {["About", "Work", "Team", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-gray-600 hover:text-black transition-colors tracking-wide"
            >
              {item}
            </Link>
          ))}
        </div>
        <Link
          href="#contact"
          className="hidden md:inline-flex h-9 items-center px-5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </nav>
  );
}
