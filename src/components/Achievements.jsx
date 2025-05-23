import { motion } from "framer-motion";

const achievements = [
  {
    name: "CSIT Computing Scholarship",
    content: "Awarded to selected JC students showing academic excellence and Computing passions",
    link: "https://www.facebook.com/watch/?v=1716844012139416"
  },
  {
    name:"WorldQuant National Qualifier",
    content:"Building alphas and competing with international contenders",
    link: "https://www.worldquant.com/brain/"
  },
  {
    name:"TJC Talent Development Programme",
    content:"School flagship programme for academically-inclined student leaders",
    link: "https://www.temasekjc.moe.edu.sg/temasek-experience/student-leadership-development/"
  }
];

const Achievements = () => {
  return (
    <motion.section
      id="achievements"
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
            Achievements 🌟
          </h2>

          {/* Right: List */}
          <div className="flex-1 flex flex-col gap-4 pt-1">
              {achievements.map((item, index) => (
                <div key={index}>
                  <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white light:text-black underline font-semibold hover:text-violet-400 transition"
                >
                  {item.name}
                </a>
                  <div className="text-sm text-gray-400 light:text-gray-500">{item.content}</div>
                </div>
              ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default Achievements;