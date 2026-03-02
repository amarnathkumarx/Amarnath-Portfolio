// components/Navbar.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // Use ref for scroll progress to avoid state updates
  const scrollProgressRef = useRef(0);
  const progressBarRef = useRef(null);
  const navRef = useRef(null);
  const rafRef = useRef(null);

  // Memoize nav links to prevent recreation
  const navLinks = useMemo(() => [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
    { name: "Achievements", to: "achievements" },
    { name: "Contact", to: "contact" },
  ], []);

  // Optimized scroll handler with RAF
  useEffect(() => {
    const updateScrollProgress = () => {
      if (!progressBarRef.current) return;
      
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      
      const progress = (window.scrollY / totalHeight) * 100;
      scrollProgressRef.current = progress;
      
      // Direct DOM manipulation instead of state
      progressBarRef.current.style.width = `${progress}%`;
      
      // Update scrolled state less frequently (every 50px)
      setScrolled(prev => {
        const shouldBeScrolled = window.scrollY > 40;
        return shouldBeScrolled !== prev ? shouldBeScrolled : prev;
      });
    };

    // Throttle with requestAnimationFrame
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Optimized magnetic effect with throttling
  useEffect(() => {
    if (!navRef.current) return;

    let ticking = false;
    
    const handleMouseMove = (e) => {
      if (!ticking && navRef.current) {
        requestAnimationFrame(() => {
          const rect = navRef.current.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          
          // Use CSS variables with percentages (more performant)
          navRef.current.style.setProperty("--x", `${x}%`);
          navRef.current.style.setProperty("--y", `${y}%`);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(() => {
        if (navRef.current) {
          navRef.current.style.setProperty("--x", `50%`);
          navRef.current.style.setProperty("--y", `50%`);
        }
      });
    };

    const element = navRef.current;
    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Separate component for nav links to prevent re-renders
  const NavLinks = useCallback(({ mobile = false }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          smooth
          offset={-80}
          duration={500}
          spy
          onSetActive={() => setActive(link.to)}
          className={mobile ? "mobile-nav-link" : "desktop-nav-link"}
          onClick={mobile ? () => setIsOpen(false) : undefined}
        >
          {!mobile && active === link.to && (
            <motion.span
              layoutId="liquid-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-blue to-cyan-400 opacity-20"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className={`relative z-10 transition-colors ${
            active === link.to 
              ? "text-electric-blue" 
              : "text-gray-300 hover:text-electric-blue"
          }`}>
            {link.name}
          </span>
        </Link>
      ))}
    </>
  ), [active, navLinks]);

  return (
    <>
      {/* Scroll Progress Bar - Direct DOM manipulation for performance */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100]">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-electric-blue to-cyan-400 relative will-change-transform"
          style={{ width: '0%' }}
        >
          <div className="absolute right-0 top-0 w-2 h-full bg-white blur-sm opacity-50" />
        </div>
      </div>

      <motion.nav
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`fixed w-full z-50 flex justify-center transition-all duration-300 ${
          scrolled ? "py-2" : "py-6"
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          ref={navRef}
          className="relative w-[95%] md:w-auto px-4 md:px-8 py-2 md:py-3 rounded-full border border-white/10 bg-navy-dark/80 backdrop-blur-md shadow-lg will-change-transform"
          style={{
            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(0,191,255,0.1), transparent 70%)",
          }}
        >
          <div className="flex justify-between items-center gap-4 md:gap-6">

            {/* Logo */}
            <Link
              to="home"
              smooth
              duration={500}
              spy
              offset={-80}
              onSetActive={() => setActive("home")}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              AK
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2 relative">
              <NavLinks />

              {/* Resume Button */}
              <a
                href="/resume.pdf"
                download
                className="ml-2 lg:ml-4 px-5 lg:px-6 py-2 rounded-full bg-gradient-to-r from-electric-blue to-cyan-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-2xl text-gray-300 hover:text-electric-blue transition-colors p-2"
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Optimized with transform instead of layout animations */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 bg-navy-dark/95 backdrop-blur-md shadow-2xl z-50 p-8 border-l border-electric-blue/20 will-change-transform"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-gray-300 hover:text-electric-blue transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link
                      to={link.to}
                      smooth
                      duration={500}
                      offset={-80}
                      onClick={() => setIsOpen(false)}
                      spy
                      onSetActive={() => setActive(link.to)}
                      className={`block text-lg py-2 px-4 rounded-lg transition-colors ${
                        active === link.to
                          ? "bg-gradient-to-r from-electric-blue/20 to-cyan-400/20 text-electric-blue"
                          : "text-gray-300 hover:bg-white/5 hover:text-electric-blue"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <a
                  href="/resume.pdf"
                  download
                  className="mt-4 px-5 py-3 rounded-lg bg-gradient-to-r from-electric-blue to-cyan-400 text-white font-semibold text-center hover:scale-105 transition-transform active:scale-95"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .desktop-nav-link {
          position: relative;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          cursor: pointer;
        }
        .mobile-nav-link {
          display: block;
          padding: 0.5rem 1rem;
          font-size: 1.125rem;
          color: #d1d5db;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover {
          color: #00bfff;
        }
      `}</style>
    </>
  );
};

export default Navbar;