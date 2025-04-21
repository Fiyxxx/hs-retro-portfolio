import { useState, useEffect } from "react";
import profilePic from "../assets/profile.png";

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
    <section className="w-full px-4 py-6 text-white">
      <div className="flex gap-6 items-center">
        <img src={profilePic} alt="profile" className="w-40 h-40 rounded-md" />
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold">Han Sheng</h1>
          <p className="text-base text-gray-400 tracking-wider mt-4">
            {displayedText}
            <span className="blinking-cursor ml-1">|</span>
          </p>
          <div className="flex gap-4 mt-8 text-base">
            <a target="_blank" href="https://linkedin.com/in/goh-han-sheng" className="hover:text-violet-400">LinkedIn</a>
            <a target="_blank" href="https://github.com/Fiyxxx" className="hover:text-violet-400">GitHub</a>
            <a target="_blank" href="mailto:gohhansheng@outlook.com" className="hover:text-violet-400">Email</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;