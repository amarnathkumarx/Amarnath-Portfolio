// components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("home");

  const navRef = useRef(null);

  // Scroll Effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrollProgress((window.scrollY / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic Hover Effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      navRef.current.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    navRef.current.style.setProperty("--x", `${x}px`);
    navRef.current.style.setProperty("--y", `${y}px`);
  };

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
    { name: "Achievements", to: "achievements" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
        <div
          className="h-full bg-gradient-to-r from-electric-blue to-cyan-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.nav
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={`fixed w-full z-50 flex justify-center transition-all duration-500 ${
          scrolled
            ? "py-3 bg-transparent"
            : "py-6"
        }`}
      >
        <div
          ref={navRef}
          onMouseMove={handleMouseMove}
          className="relative w-[95%] md:w-auto px-8 py-3 rounded-full border border-white/10 bg-navy-dark/70 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.5)]"
          style={{
            background:
              "radial-gradient(600px circle at var(--x) var(--y), rgba(0,191,255,0.15), transparent 40%)",
          }}
        >
          <div className="flex justify-between items-center gap-6">

            {/* Logo */}
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="home"
                smooth
                duration={500}
                className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent cursor-pointer"
              >
                AK
              </Link>
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-2 relative">

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  offset={-80}
                  duration={500}
                  spy
                  onSetActive={() => setActive(link.to)}
                  className="relative px-5 py-2 text-sm cursor-pointer"
                >
                  {active === link.to && (
                    <motion.span
                      layoutId="liquid-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-blue to-cyan-400 opacity-20"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors ${
                      active === link.to
                        ? "text-electric-blue"
                        : "text-gray-300 hover:text-electric-blue"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}

              {/* Premium Resume Button */}
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-electric-blue to-cyan-400 text-white font-semibold shadow-lg shadow-electric-blue/50 hover:shadow-electric-blue/80 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Resume</span>
                <span className="absolute inset-0 animate-pulse bg-white/10"></span>
              </motion.a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-2xl text-gray-300 hover:text-electric-blue"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 bg-navy-dark backdrop-blur-2xl shadow-2xl z-50 p-10"
            >
              <div className="flex justify-end mb-10">
                <FaTimes
                  onClick={() => setIsOpen(false)}
                  className="text-2xl cursor-pointer text-gray-300 hover:text-electric-blue"
                />
              </div>

              <div className="flex flex-col gap-7">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    smooth
                    duration={500}
                    offset={-80}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-gray-300 hover:text-electric-blue transition"
                  >
                    {link.name}
                  </Link>
                ))}

                <a
                  href="/resume.pdf"
                  download
                  className="mt-6 px-5 py-3 rounded-lg bg-gradient-to-r from-electric-blue to-cyan-400 text-white font-semibold text-center"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;