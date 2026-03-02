// src/components/Hero.jsx
import React, { memo, useMemo, useCallback, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDownload,
  FaCode,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { HiMail, HiAcademicCap, HiBriefcase } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { BsAward } from "react-icons/bs";
import { FiClock } from "react-icons/fi";

const Hero = memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const { scrollY } = useScroll();

  // Live time update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time function
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  // Format date function
  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Parallax effects
  const opacity = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Mouse move effect
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  // Social Links
  const socialLinks = useMemo(
    () => [
      {
        icon: FaGithub,
        link: "https://github.com/amarnathkumarx",
        color: "hover:text-gray-300",
        label: "GitHub",
      },
      {
        icon: FaLinkedin,
        link: "https://linkedin.com/in/amarnathkumarx",
        color: "hover:text-blue-400",
        label: "LinkedIn",
      },
      {
        icon: FaTwitter,
        link: "https://twitter.com/amarnathkumarx",
        color: "hover:text-blue-300",
        label: "Twitter",
      },
      {
        icon: FaCode,
        link: "https://leetcode.com/amarnathkumarx",
        color: "hover:text-yellow-400",
        label: "LeetCode",
      },
    ],
    [],
  );

  // Typing Sequence
  const typingSequence = useMemo(
    () => [
      "Full Stack Developer",
      2000,
      "MERN Stack Expert",
      2000,
      "Problem Solver",
      2000,
      "Java Developer",
      2000,
    ],
    [],
  );

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  // Quick stats
  const quickStats = [
    { icon: FaCode, value: "4+", label: "Projects" },
    { icon: HiAcademicCap, value: "7.1", label: "CGPA" },
    { icon: HiBriefcase, value: "1", label: "Internships" },
    { icon: BsAward, value: "5+", label: "Certifications" },
  ];

  // Contact info
  const contactInfo = [
    {
      icon: FaEnvelope,
      value: "amarnathkumar22012004@gmail.com",
      link: "mailto:amarnathkumar22012004@gmail.com",
    },
    { icon: FaPhone, value: "+91 9973576746", link: "tel:+919973576746" },
    { icon: MdLocationOn, value: "New Delhi, India", link: "#" },
  ];

  // Scroll function
  const scrollToContact = useCallback((e) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Floating particles for background
  const particles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      duration: Math.random() * 15 + 10,
    }));
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-navy-darker"
      aria-label="Hero section"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-electric-blue/10 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity }}
        >
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Bar with Live Time */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6"
            >
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 bg-navy-light/50 backdrop-blur-sm px-4 py-2 rounded-full border border-electric-blue/30">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-300">
                  Available for work
                </span>
              </div>

              {/* Live Time Display */}
              <motion.div
                className="inline-flex items-center gap-2 bg-navy-light/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FiClock className="text-cyan-400 animate-pulse" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-400">IST</span>
                  <span className="text-sm font-mono text-cyan-400 font-semibold">
                    {formatTime(currentTime)}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Date Display */}
            <motion.div
              variants={itemVariants}
              className="text-xs text-gray-500 mb-2 flex items-center gap-2 justify-center lg:justify-start"
            >
              <span>{formatDate(currentTime)}</span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="text-electric-blue font-medium mb-2 text-sm sm:text-base flex items-center gap-2 justify-center lg:justify-start"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👋
              </motion.span>
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
              }}
            >
              Amarnath{" "}
              <span className="bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">
                Kumar
              </span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 text-gray-300"
            >
              I'm a{" "}
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="text-electric-blue font-semibold"
                deletionSpeed={50}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-6 max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed"
            >
              Final-year CSE student passionate about building scalable web
              applications and solving real-world problems through code.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-md mx-auto lg:mx-0"
            >
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-navy-light/30 backdrop-blur-sm p-3 rounded-lg border border-electric-blue/20"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="text-electric-blue text-xl mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6"
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-electric-blue transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <info.icon className="text-electric-blue" />
                  <span className="hidden sm:inline">{info.value}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#contact"
                onClick={scrollToContact}
                className="px-6 py-3 bg-gradient-to-r from-electric-blue to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/20 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiMail /> Hire Me
              </motion.a>

              <motion.a
                href="/Amarnath_Kumar_BTech2026.pdf"
                download
                className="px-6 py-3 border-2 border-electric-blue rounded-lg font-semibold hover:bg-electric-blue/10 transition-all duration-300 flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="group-hover:translate-y-0.5 transition-transform" />
                Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl text-gray-400 ${social.color} transition-colors`}
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Avatar */}
          <motion.div
            className="flex-1 flex justify-center mt-8 lg:mt-0"
            variants={avatarVariants}
            style={{
              rotateY: mousePosition.x * 5,
              rotateX: -mousePosition.y * 5,
            }}
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-blue to-cyan-500 blur-3xl opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Avatar Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-electric-blue/30 shadow-2xl">
                <img
                  src="/images/profile.jpeg"
                  alt="Amarnath Kumar"
                  className="w-full h-full object-cover"
                  loading="eager"
                  width="400"
                  height="400"
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=Amarnath+Kumar&size=400&background=0B2D3F&color=fff&bold=true";
                  }}
                />
              </div>

              {/* Floating Tech Icons */}
              <motion.div
                className="absolute -top-3 -right-3 bg-navy-light/90 p-3 rounded-full shadow-xl border border-electric-blue/30 backdrop-blur-sm"
                animate={{
                  y: [0, -8, 0],
                  rotate: 360,
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="React"
                  className="w-6 h-6"
                />
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3 bg-navy-light/90 p-3 rounded-full shadow-xl border border-cyan-400/30 backdrop-blur-sm"
                animate={{
                  y: [0, 8, 0],
                  rotate: -360,
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, delay: 1 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                  alt="Java"
                  className="w-6 h-6"
                />
              </motion.div>

              {/* Time Display on Avatar */}
              <motion.div
                className="absolute -bottom-2 right-8 bg-navy-dark/90 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-400/30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="text-xs font-mono text-cyan-400">
                  {formatTime(currentTime)}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-gradient-to-b from-electric-blue to-cyan-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-electric-blue/20 rounded-tl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-cyan-400/20 rounded-br-3xl"></div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
