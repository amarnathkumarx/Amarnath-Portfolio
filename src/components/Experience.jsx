// components/Experience.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendar, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: "Web Development Intern",
      company: "CodSoft",
      location: "Remote",
      period: "April 2024 – May 2024",
      description: [
        "Developed responsive web applications using HTML, CSS, JavaScript and React.js",
        "Built functional components and implemented reusable UI structures",
        "Improved understanding of frontend architecture and API integration",
        "Collaborated remotely and managed tasks within deadlines",
      ],
      tech: ["React", "JavaScript", "HTML", "CSS", "Git"],
    },
    {
      title: "Campus Ambassador",
      company: "Physics Wallah",
      location: "Remote",
      period: "2024 - 2025",
      description: [
        "Promoted Physics Wallah initiatives and programs within campus",
        "Coordinated student engagement through online and offline communication",
        "Enhanced leadership, communication, and networking skills",
        "Represented the organization during academic campaigns and events",
      ],
      tech: ["Communication", "Leadership", "Marketing", "Networking"],
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 bg-navy-darker relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Work{" "}
              <span className="bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-cyan-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Internship and leadership experience during graduation
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-electric-blue to-cyan-400"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-electric-blue rounded-full border-4 border-navy-darker z-10"></div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-navy-light/30 backdrop-blur-sm p-6 rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 text-electric-blue mb-2">
                      <FaBriefcase />
                      <span className="text-sm font-semibold">{exp.title}</span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">
                      {exp.company}
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendar /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-gray-300 text-sm flex items-start gap-2"
                        >
                          <span className="text-electric-blue mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-navy-dark text-xs rounded-full text-electric-blue border border-electric-blue/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
