import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full py-8 text-center text-sm text-gray-500"
    >
      <p className="px-4">
        han sheng © 2025 • made with ❤️
      </p>
    </motion.footer>
  );
};

export default Footer;