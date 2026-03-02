// components/GitHubContributions.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaCodeBranch, FaLaptopCode, FaUsers } from "react-icons/fa";

const GitHubContributions = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Generate simulated consistent contribution grid
  const generateContributionData = () => {
    const weeks = 52;
    const days = 7;
    const data = [];

    for (let i = 0; i < weeks; i++) {
      const week = [];
      for (let j = 0; j < days; j++) {
        week.push(Math.floor(Math.random() * 4)); // 0–3 instead of 0–4
      }
      data.push(week);
    }

    return data;
  };

  const contributionData = generateContributionData();

  const getColorClass = (level) => {
    switch (level) {
      case 0:
        return "bg-navy-dark";
      case 1:
        return "bg-electric-blue/20";
      case 2:
        return "bg-electric-blue/50";
      case 3:
        return "bg-electric-blue";
      default:
        return "bg-navy-dark";
    }
  };

  // Fresher-safe stats (no fake numbers)
  const stats = [
    {
      icon: FaCodeBranch,
      value: "Active Contributor",
      label: "Open Source Learning",
    },
    {
      icon: FaLaptopCode,
      value: "Full Stack Projects",
      label: "MERN & Java",
    },
    {
      icon: FaUsers,
      value: "Team Collaboration",
      label: "Git & GitHub",
    },
    {
      icon: FaGithub,
      value: "Consistent Practice",
      label: "Problem Solving",
    },
  ];

  return (
    <section className="py-16 bg-navy-darker">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            GitHub{" "}
            <span className="bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">
              Activity
            </span>
          </h3>

          {/* Professional Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-light/30 rounded-xl p-6 text-center border border-electric-blue/20"
              >
                <stat.icon className="text-3xl text-electric-blue mx-auto mb-3" />
                <div className="text-sm font-semibold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Contribution Graph */}
          <div className="bg-navy-light/30 rounded-xl p-6 border border-electric-blue/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Contribution Activity</h4>

              <a
                href="https://github.com/amarnathkumarx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-blue hover:underline text-sm flex items-center gap-1"
              >
                View GitHub <FaGithub />
              </a>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-flex gap-1 min-w-max">
                {contributionData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((level, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 0.5 + weekIndex * 0.01,
                        }}
                        className={`w-3 h-3 rounded-sm ${getColorClass(
                          level,
                        )} hover:scale-125 transition-transform cursor-pointer`}
                        title="Contribution Activity"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-4 mt-4 text-xs text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-navy-dark rounded-sm"></div>
                <div className="w-3 h-3 bg-electric-blue/20 rounded-sm"></div>
                <div className="w-3 h-3 bg-electric-blue/50 rounded-sm"></div>
                <div className="w-3 h-3 bg-electric-blue rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubContributions;
