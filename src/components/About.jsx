// components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap, FaCode, FaBriefcase, FaAward } from "react-icons/fa";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: FaGraduationCap,
      title: "Education",
      description: "B.Tech CSE (Final Year)",
      detail: "CGPA: 7.1/10",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: FaCode,
      title: "Projects",
      description: "4+ Academic & Personal Projects",
      detail: "MERN & Java Applications",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: FaBriefcase,
      title: "Experience",
      description: "1 Internship",
      detail: "Frontend & Web Development",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: FaAward,
      title: "Achievements",
      description: "Hackathon Participant",
      detail: "5+ Technical Certifications",
      color: "from-orange-400 to-red-400",
    },
  ];

  return (
    <section
      id="about"
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
              About{" "}
              <span className="bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Bio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Final Year CSE Student &{" "}
                <span className="text-electric-blue">Full Stack Developer</span>
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                I'm Amarnath Kumar, a passionate and detail-oriented Computer
                Science Engineering student in my final year. With a strong
                foundation in full-stack development and problem-solving, I've
                built multiple real-world applications that solve practical
                problems.
              </p>

              <p className="text-gray-400 mb-6 leading-relaxed">
                My journey in tech started with Java and evolved into the MERN
                stack. I've interned at tech startups where I contributed to
                production-level code and learned industry best practices. I'm
                now looking for opportunities where I can leverage my skills to
                build impactful solutions.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                  <span className="text-gray-300">
                    <strong className="text-white">Name:</strong> Amarnath Kumar
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">
                    <strong className="text-white">Email:</strong>{" "}
                    amarnathkumar22012004@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                  <span className="text-gray-300">
                    <strong className="text-white">Location:</strong> New Delhi,
                    India
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">
                    <strong className="text-white">Availability:</strong>{" "}
                    Immediate (Placement)
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-navy-light/30 p-4 rounded-xl border border-electric-blue/20">
                  <div className="text-2xl font-bold text-electric-blue">
                    4+
                  </div>
                  <div className="text-sm text-gray-400">
                    Projects Completed
                  </div>
                </div>
                <div className="bg-navy-light/30 p-4 rounded-xl border border-cyan-400/20">
                  <div className="text-2xl font-bold text-cyan-400">5+</div>
                  <div className="text-sm text-gray-400">Certifications</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-navy-light/30 backdrop-blur-sm p-6 rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} p-3 mb-4`}
                  >
                    <item.icon className="w-full h-full text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-electric-blue font-medium">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
