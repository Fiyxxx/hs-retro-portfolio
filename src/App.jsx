import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Intro from './components/Intro';
import Entries from './components/Entries';
import Footer from './components/Footer';
import Writing from './pages/Writing';
import Post from './pages/posts/Post';
import { experience } from './data/experience';
import { achievements } from './data/achievements';
import { projects } from './data/projects';

const Home = () => (
  <>
    <Intro />
    <Entries title="experience" items={experience} />
    <Entries title="achievements" items={achievements} />
    <Entries title="projects" items={projects} />
  </>
);

const App = () => {
  return (
    <Router>
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<Post />} />
          <Route path="/blog" element={<Writing />} />
          <Route path="/blog/:slug" element={<Post />} />
        </Routes>
        <Footer />
      </main>
      <Analytics />
    </Router>
  );
};

export default App;
