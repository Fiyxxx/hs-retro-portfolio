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
        <div className="flex justify-center">Coming Soon! 🙈</div>
    </motion.section>
  );
};

export default Showcase;