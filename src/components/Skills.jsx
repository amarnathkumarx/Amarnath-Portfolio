// components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React.js", level: 90, icon: "react" },
        { name: "JavaScript", level: 85, icon: "javascript" },
        { name: "TypeScript", level: 75, icon: "typescript" },
        { name: "HTML5/CSS3", level: 90, icon: "html5" },
        { name: "TailwindCSS", level: 85, icon: "tailwindcss" },
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 85, icon: "nodejs" },
        { name: "Express.js", level: 80, icon: "express" },
        { name: "Java", level: 85, icon: "java" },
        { name: "Spring Boot", level: 75, icon: "spring" },
        { name: "Python", level: 70, icon: "python" },
      ]
    },
    {
      title: "Database & Tools",
      skills: [
        { name: "MongoDB", level: 85, icon: "mongodb" },
        { name: "MySQL", level: 80, icon: "mysql" },
        { name: "PostgreSQL", level: 75, icon: "postgresql" },
        { name: "Git/GitHub", level: 90, icon: "git" },
        { name: "Docker", level: 70, icon: "docker" },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 bg-navy-darker relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Technical <span className="bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-cyan-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-navy-light/50 backdrop-blur-sm rounded-2xl p-6 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-electric-blue">{category.title}</h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-electric-blue">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-navy-dark rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-electric-blue to-cyan-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.2 * index }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Icons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-electric-blue/20">
                  {['react', 'nodejs', 'mongodb', 'java', 'spring'].map((tech, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img 
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg`}
                        alt={tech}
                        className="w-full h-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;