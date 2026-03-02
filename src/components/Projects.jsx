// components/Projects.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaCodeBranch,
  FaChevronDown,
} from "react-icons/fa";

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "Cartify – MERN E-Commerce Platform",
      description:
        "Scalable full-stack MERN e-commerce application with JWT authentication and role-based access control (Admin/User). Features Stripe payments, cart persistence, wishlist, and admin analytics dashboard.",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux Toolkit",
        "JWT",
        "Stripe API",
        "Cloudinary",
      ],
      github: "https://github.com/amarnathkumarx/cartify-fullstack",
      live: "https://shopsphere-demo.vercel.app",
      stars: 52,
      forks: 18,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "CareerConnect – MERN Job Portal",
      description:
        "Full-stack Job Portal with JWT auth and role-based access (Admin/Recruiter/Candidate). Includes AI job matching and dashboard analytics.",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "JWT",
        "Cloudinary",
      ],
      github: "https://github.com/amarnathkumarx/careerconnect-mern",
      live: "https://careerconnect-demo.vercel.app",
      stars: 42,
      forks: 12,
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "MediCare+ – MERN Healthcare System",
      description:
        "Healthcare management platform with appointment scheduling, EHR system, WebRTC consultations, and real-time notifications.",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux Toolkit",
        "JWT",
        "WebRTC",
      ],
      github: "https://github.com/amarnathkumarx/medicare-plus-mern",
      live: "https://medicare-plus-demo.vercel.app",
      stars: 60,
      forks: 21,
      image:
        "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "AI Code Assistant",
      description:
        "AI-powered VS Code extension providing intelligent code suggestions and explanations using OpenAI API.",
      tech: ["JavaScript", "React", "Node.js", "OpenAI API"],
      github: "https://github.com/amarnathkumarx/aicoder",
      live: "https://aicoder-demo.com",
      stars: 67,
      forks: 21,
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section
      id="projects"
      className="py-24 bg-navy-darker relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold">
              Featured{" "}
              <span className="bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-cyan-400 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Production-level applications built using modern web technologies.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            <AnimatePresence>
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl bg-navy-light/30 border border-electric-blue/20 backdrop-blur-sm overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-darker to-transparent opacity-60"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-electric-blue transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>

                    {/* GitHub Stats */}
                    <div className="flex items-center gap-4 text-sm mb-4 text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCodeBranch />
                        {project.forks}
                      </span>
                    </div>

                    {/* Tech Stack Toggle */}
                    <button
                      onClick={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                      className="flex items-center gap-2 text-electric-blue text-sm mb-4 hover:opacity-80 transition"
                    >
                      Tech Stack
                      <FaChevronDown
                        className={`transition-transform ${
                          expandedIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedIndex === index && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-navy-dark border border-electric-blue/30 text-electric-blue"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-6 mt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-electric-blue transition"
                      >
                        <FaGithub /> Code
                      </a>

                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-cyan-400 transition"
                      >
                        <FaExternalLinkAlt /> Live
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View More Button */}
          <div className="text-center mt-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-electric-blue to-cyan-400 text-white font-medium shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {showAll ? "Show Less Projects" : "View More Projects"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
