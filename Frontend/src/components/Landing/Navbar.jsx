// src/components/landing/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { HiMenu, HiX } from "react-icons/hi";
import { BsLightningChargeFill } from "react-icons/bs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const buttonsRef = useRef([]);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Compare", href: "#comparison" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8 },
    );

    tl.fromTo(
      linksRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      "-=0.4",
    );

    tl.fromTo(
      buttonsRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
      "-=0.3",
    );
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, height: 0 },
          { opacity: 1, height: "auto", duration: 0.4, ease: "power2.out" },
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3 shadow-lg shadow-primary/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a ref={logoRef} href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <BsLightningChargeFill className="text-white text-lg" />
            </div>
            <span className="text-2xl font-extrabold">
              <span className="text-white">Flexi</span>
              <span className="gradient-text">Work</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                ref={(el) => (linksRef.current[i] = el)}
                href={link.href}
                className="text-gray-text hover:text-white text-sm font-medium transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              ref={(el) => (buttonsRef.current[0] = el)}
              className="text-gray-text hover:text-white text-sm font-medium transition-colors duration-300 px-4 py-2"
            >
              Log In
            </button>
            <button
              ref={(el) => (buttonsRef.current[1] = el)}
              className="relative px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className="lg:hidden overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-text hover:text-white text-sm font-medium transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-dark-card"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3 px-4">
              <button className="text-gray-text hover:text-white text-sm font-medium py-2.5 rounded-xl border border-dark-border hover:border-primary/30 transition-all">
                Log In
              </button>
              <button className="bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold py-2.5 rounded-xl">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
