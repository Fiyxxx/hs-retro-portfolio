import { motion } from "framer-motion";

const achievements_comp = [
  {
    name: "CSIT Computing Scholarship",
    content: "Awarded to selected JC students showing academic excellence and Computing passions"
  },
  {
    name:"WorldQuant National Qualifier",
    content:"Building alphas and competing with international contenders"
  },
  {
    name:"TJC Talent Development Programme",
    content:"School flagship programme for academically-inclined student leaders"
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
              {achievements_comp.map((item, index) => (
                <div key={index}>
                  <div className="text-base text-white light:text-black font-semibold">{item.name}</div>
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