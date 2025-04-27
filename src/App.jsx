import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const Home = () => (
  <>
    <Hero />
    <Skills />
    <Projects />
    <Achievements />
    <Education />
    <Certifications />
    <Experience />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      {/* Background Video */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <video
          className="w-full h-full object-cover opacity-20"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/bg-video.mp4" type="video/mp4" />
        </video>
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
    </Router>
  );
};

export default App;
