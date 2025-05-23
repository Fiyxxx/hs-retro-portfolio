import { motion } from "framer-motion";

const certifications = [
  {
    name: "Harvard's CS50X",
    content: "Introduction to Computer Science",
    link: "https://cs50.harvard.edu/x/2025/"
  },
  {
    name: "Harvard's CS50P",
    content: "Introduction to Programming with Python",
    link: "https://cs50.harvard.edu/python/2022/"
  },
  {
    name: "Stanford's Machine Learning Specialisation",
    content: "Fundamental Mathematical and AI concepts with NumPy, TensorFlow",
    link: "https://www.coursera.org/specializations/machine-learning-introduction"
  },
  {
    name: "The Odin Project's Foundation Course",
    content: "Fundamental Web Development with HTML, CSS, JavaScript",
    link: "https://www.theodinproject.com/paths/foundations/courses/foundations"
  },
  {
    name: "UPenn's Fundamentals of Quantitative Modelling",
    content: "Fundamental Mathematical and Modelling concepts for Quantitative Research",
    link: "https://www.coursera.org/learn/wharton-quantitative-modeling"
  }
]

const Certifications = () => {
  return (
    <motion.section
      id="certifications"
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
            Certifications 📝
          </h2>

          {/* Right: Certification List */}
          <div className="flex-1 flex flex-col gap-4 pt-1">
            {certifications.map((cert, index) => (
              <div key={index}>
                <a href={cert.link} target="_blank" className="font-semibold underline text-white light:text-black hover:text-violet-400 transition">{cert.name}</a>
                <div className="text-sm text-gray-400 light:text-gray-500">{cert.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Certifications;