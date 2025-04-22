import { motion } from "framer-motion";
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiDotnet,
  SiGit,
  SiUnity,
} from "react-icons/si";

const Skills = () => {
  return (
    <motion.section
      id="skills"
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
          <h2 className="text-3xl text-white font-bold tracking-wider w-full md:w-1/3">
            Skills 👾
          </h2>

          {/* Right: Logos + Focus */}
          <div className="flex-1 flex flex-col gap-6 pt-1">
            {/* Tech Logos */}
            <div className="flex flex-wrap gap-4 text-2xl text-white">
              <SiPython className="hover:text-violet-400 transition" />
              <SiCplusplus className="hover:text-violet-400 transition" />
              <SiJavascript className="hover:text-violet-400 transition" />
              <SiReact className="hover:text-violet-400 transition" />
              <SiDotnet className="hover:text-violet-400 transition" />
              <SiGit className="hover:text-violet-400 transition" />
              <SiUnity className="hover:text-violet-400 transition" />
            </div>

            {/* Focus Areas */}
            <div className="text-sm text-gray-400 space-y-1">
              <p className="text-white text-base font-semibold">Focus:</p>
              <p>ML (NLP and Cybersecurity)</p>
              <p>App Development</p>
              <p>Game Development</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;