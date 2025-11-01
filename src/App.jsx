import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import Post from './pages/posts/Post';
import Showcase from './pages/Showcase';
import { LiquidChrome } from './blocks/Backgrounds/LiquidChrome/LiquidChrome';

const Home = () => (
  <>
    <Hero />
    <Skills />
    <Experience />
    <Projects />
    <Achievements />
    <Education />
    <Certifications />
    <Footer />
  </>
);

const App = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains('light');
      setTheme(isLight ? 'light' : 'dark');
    };

    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const getBackgroundColors = () => {
    if (theme === 'light') {
      return {
        baseColor: [0.8, 0.7, 0.3], // Light yellowish colors
        opacity: 0.2
      };
    }
    return {
      baseColor: [0.15, 0.05, 0.2], // Dark purple colors
      opacity: 0.3
    };
  };

  const { baseColor, opacity } = getBackgroundColors();

  return (
    <Router>
      {/* Liquid Chrome Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <LiquidChrome 
          baseColor={baseColor} 
          speed={0.3} 
          amplitude={0.3}
          interactive={true}
          style={{ opacity }}
        />
      </div>

      {/* Foreground Content */}
      <Header />
      <div className="max-w-screen-md mx-auto px-6 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/blog/:slug" element={<Post />} />
        </Routes>
      </div>
      <Analytics />
    </Router>
  );
};

export default App;
