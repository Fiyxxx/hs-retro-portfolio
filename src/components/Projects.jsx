import { motion } from "framer-motion";

const projects = [
  {
    title: "Lumi",
    link: "https://lumi-app-theta.vercel.app",
    description: "Flashcard mobile app with LLM integration to help students learn faster"
  },
  {
    title: "SemperStroke",
    link: "#",
    description: "VR therapy game to aid the rehabilitation of stroke patients"
  },
  {
    title: "futbólvision",
    link: "#",
    description: "Football analytics tool using computer vision for real-time player detection"
  },
  {
    title: "Jitsuna",
    link: "#",
    description: "A minimalist Telegram bot to log habits and track progress"
  },
];

const Projects = () => {
  return (
    <motion.section
      id="projects"
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
            Projects 🔧
          </h2>

          {/* Right: Project List */}
          <div className="flex-1 flex flex-col gap-4 pt-1">
            {projects.map((project, index) => (
              <div key={index}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white light:text-black underline font-semibold hover:text-violet-400 transition"
                >
                  {project.title}
                </a>
                <p className="text-sm text-gray-400 light:text-gray-500">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;