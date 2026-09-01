import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Writing from './pages/Writing';
import Post from './pages/posts/Post';

const Home = () => (
  <>
    <Hero />
    <Experience />
    <Achievements />
    <Projects />
    <Education />
    <Certifications />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Header />
      <main className="mx-auto w-full max-w-[640px] px-5 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<Post />} />
          <Route path="/blog" element={<Writing />} />
          <Route path="/blog/:slug" element={<Post />} />
        </Routes>
      </main>
      <Analytics />
    </Router>
  );
};

export default App;
