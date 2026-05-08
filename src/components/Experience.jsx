import { motion } from "framer-motion";

const experience = [
  {
    name: "Cybersecurity Engineer Intern",
    company: "Centre for Strategic Infocomm Technologies (CSIT)",
    dateRange: "May 2026 - Current",
    focus: "Vulnerability analysis"
  },
  {
    name: "Software Engineer Intern",
    company: "Ecovolt Technologies Pte Ltd",
    dateRange: "Sep 2025 - Current",
    focus: "Full-stack development, special projects, operations"
  },
  {
    name: "Frontend Developer",
    company: "National University of Singapore",
    dateRange: "Mar 2026 - Current",
    focus: "Building content hub for Health & Wellbeing Team"
  }
];

const Experience = () => {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full py-4"
    >
      <div className="max-w-screen-md mx-auto px-6 flex flex-col gap-6">
        {/* Section Divider */}
        <div className="border-t border-gray-700 w-full"></div>

        {/* Title + Content */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Section Title */}
          <h2 className="text-3xl text-white light:text-black font-bold tracking-wider w-full md:w-1/3">
            Experience 👷🏼‍♂️
          </h2>

          {/* Right: School Cards */}
          <div className="flex-1 flex flex-col gap-4 pt-1">
            {experience.map((job, index) => (
              <div
                key={index}
                className="text-white light:text-black"
              >
                <h3 className="text-base font-semibold">{job.name}</h3>
                <p className="text-sm text-gray-400 light:text-gray-500 underline">{job.company}</p>
                <p className="text-sm text-gray-400 light:text-gray-500">{job.dateRange}</p>
                <p className="text-sm text-gray-400 light:text-gray-500">{job.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;