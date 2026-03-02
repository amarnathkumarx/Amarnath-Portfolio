// components/Achievements.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaTrophy, FaCertificate, FaMedal, FaAward } from "react-icons/fa";

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      icon: FaTrophy,
      title: "Hackathon Participant",
      organization: "College Tech Fest 2024",
      description:
        "Participated in a 24-hour hackathon and collaborated in a team to build a web-based solution.",
      date: "March 2024",
      color: "from-yellow-400 to-orange-400",
    },
    {
      icon: FaMedal,
      title: "Technical Event Participation",
      organization: "Inter-College Coding Competition",
      description:
        "Actively participated in coding contests and problem-solving events.",
      date: "2023",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: FaCertificate,
      title: "Full Stack Development Training",
      organization: "Online Certification Program",
      description:
        "Completed hands-on training covering MERN stack fundamentals and project development.",
      date: "January 2024",
      color: "from-blue-400 to-purple-400",
    },
    {
      icon: FaAward,
      title: "Java Programming Certification",
      organization: "Online Learning Platform",
      description:
        "Completed certification focusing on Core Java concepts and OOP principles.",
      date: "October 2023",
      color: "from-red-400 to-pink-400",
    },
  ];

  const certifications = [
    "Full Stack Development Certification",
    "Java Programming Certification",
    "Web Development Bootcamp",
    "MongoDB Basics Certification",
    "Git & GitHub Fundamentals",
  ];

  return (
    <section
      id="achievements"
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
              Achievements &{" "}
              <span className="bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-cyan-400 mx-auto rounded-full"></div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-navy-light/30 backdrop-blur-sm p-6 rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} p-3 mb-4 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-electric-blue text-sm mb-2">
                  {item.organization}
                </p>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </motion.div>
            ))}
          </div>

          {/* Certifications List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-navy-light/30 backdrop-blur-sm p-8 rounded-xl border border-electric-blue/20"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Professional{" "}
              <span className="text-electric-blue">Certifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-navy-dark/50 rounded-lg"
                >
                  <FaCertificate className="text-electric-blue flex-shrink-0" />
                  <span className="text-sm text-gray-300">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
