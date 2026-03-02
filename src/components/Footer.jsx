// components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaGithub,
      link: "https://github.com/amarnathkumarx",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      link: "https://linkedin.com/in/amarnathkumarx",
      label: "LinkedIn",
    },
    {
      icon: FaTwitter,
      link: "https://twitter.com/amarnathkumarx",
      label: "Twitter",
    },
    {
      icon: FaEnvelope,
      link: "mailto:amarnathkumar22012004@gmail.com",
      label: "Email",
    },
  ];

  const quickLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <footer className="bg-navy-dark border-t border-electric-blue/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent mb-4">
              Amarnath Kumar
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Final-year CSE student passionate about building innovative web
              solutions and solving real-world problems.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-navy-light/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-electric-blue hover:border-electric-blue border border-transparent transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-electric-blue">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="text-gray-400 hover:text-electric-blue cursor-pointer transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-electric-blue">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>New Delhi, India</li>
              <li>+91 99735 76746</li>
              <li>amarnathkumar22012004@gmail.com</li>
              <li>Available for placement</li>
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-electric-blue">
              Placement
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              Open to full-time opportunities in software development.
            </p>
            <motion.a
              href="#contact"
              className="inline-block px-4 py-2 bg-gradient-to-r from-electric-blue to-cyan-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-electric-blue/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-electric-blue/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Amarnath Kumar. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Made with <FaHeart className="text-red-500" /> for recruiters
          </p>
          <p className="text-xs text-gray-500">
            Designed for placement success
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
