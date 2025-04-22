import { motion } from "framer-motion";

const experience = [
  {
    name: "SemperStroke - Principal VR Programmer",
    focus: "Building VR/XR games with Unity, C#"
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