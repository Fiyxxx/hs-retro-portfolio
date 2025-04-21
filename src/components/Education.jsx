import { motion } from "framer-motion";

const schools = [
  {
    name: "Bachelor of Computing (Business AI Systems)",
    years: "2025–2029",
    focus: "National University of Singapore",
    score: ""
  },
  {
    name: "GCE 'A' Levels (incl. H2 Computing, Math)",
    years: "2021–2022",
    focus: "Temasek Junior College",
    score: "RP: 87.5"
  },
  {
    name: "GCE 'O' Levels",
    years: "2017–2020",
    focus: "Anglican High School",
    score: "L1R5: 7"
  }
];

const Education = () => {
  return (
    <motion.section
      id="education"
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
            Education
          </h2>

          {/* Right: School Cards */}
          <div className="flex-1 flex flex-col gap-4 pt-1">
            {schools.map((school, index) => (
              <div
                key={index}
                className="text-white"
              >
                <h3 className="text-base font-semibold">{school.name}</h3>
                <p className="text-sm text-gray-400">{school.years}</p>
                <p className="text-sm text-gray-400">{school.focus}</p>
                {school.score && (
                  <p className="text-sm text-gray-400">{school.score}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Education;