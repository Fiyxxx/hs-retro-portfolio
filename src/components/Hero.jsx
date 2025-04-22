import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/profile.png";
import profilePic2 from "../assets/chopperhat.jpg";

const words = [
  "software engineer",
  "building tech for social good",
  "cs student",
  "coding rn",
];

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 30);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full py-6"
    >
      <div className="max-w-screen-md mx-auto px-6 flex flex-col md:flex-row gap-10 items-center">
        {/* Profile Picture */}
        <div className="flex-shrink-0 flex justify-center w-full md:w-1/3">
          <img
            src={profilePic2}
            alt="profile"
            className="w-40 h-40 rounded-md object-cover"
          />
        </div>

        {/* Name, Typewriter, Links */}
        <div className="flex flex-col text-white light:text-black text-center md:text-left w-full">
          <h1 className="text-5xl font-bold">Han Sheng</h1>
          <p className="text-base text-gray-400 light:text-gray-500 tracking-wider mt-4">
            {displayedText}
            <span className="blinking-cursor ml-1">|</span>
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 text-base">
            <a target="_blank" href="https://linkedin.com/in/goh-han-sheng" className="hover:text-violet-400">LinkedIn</a>
            <a target="_blank" href="https://github.com/Fiyxxx" className="hover:text-violet-400">GitHub</a>
            <a target="_blank" href="mailto:gohhansheng@outlook.com" className="hover:text-violet-400">Email</a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;