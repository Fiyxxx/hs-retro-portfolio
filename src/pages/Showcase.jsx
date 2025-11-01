import { motion } from "framer-motion";

const Showcase = () => {
  return (
    <motion.section
      id="showcase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full py-4"
    >
      <div className="max-w-screen-md mx-auto px-6 flex flex-col gap-6">
        <h2 className="text-3xl text-white light:text-black font-bold tracking-wider">Showcase</h2>
        <div className="flex justify-center text-white light:text-black">Coming Soon! 🙈</div>
      </div>
    </motion.section>
  );
};

export default Showcase;