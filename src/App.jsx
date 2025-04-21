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
      <Header />
      <div className="max-w-screen-md mx-auto px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
