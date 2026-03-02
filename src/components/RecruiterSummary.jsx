// components/RecruiterSummary.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaChartLine, FaUsers, FaRocket } from 'react-icons/fa';

const RecruiterSummary = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: FaBriefcase, value: "4+", label: "Projects" },
    { icon: FaUsers, value: "2+", label: "Team Projects" },
    { icon: FaChartLine, value: "7.1", label: "CGPA" },
    { icon: FaRocket, value: "1", label: "Internships" }
  ];

const highlights = [
  "Built End-to-End MERN Applications",
  "Solved 300+ DSA Problems",
  "Strong OOPs & Core Java Knowledge",
  "Experience with REST APIs & Backend Logic",
  "Version Control (Git/GitHub)",
  "Agile Team Collaboration",
  "Highly Adaptable & Fast Learner",
  "Immediate Joiner – Flexible Location"
];

  return (
    <section className="py-12 bg-gradient-to-r from-electric-blue/10 to-cyan-400/10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-navy-light/30 backdrop-blur-md rounded-2xl p-8 border border-electric-blue/30"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">
                  Why Hire Me?
                </span>
              </h3>
              <p className="text-gray-300 mb-6">
                A passionate final-year CSE student with strong technical skills and practical experience. Ready to contribute effectively from day one.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="text-2xl text-electric-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#contact"
                className="inline-block px-6 py-3 bg-gradient-to-r from-electric-blue to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Interview
              </motion.a>
            </div>

            {/* Right Content - Highlights */}
            <div className="bg-navy-dark/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaRocket className="text-electric-blue" />
                Key Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                    <span className="text-sm text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruiterSummary;