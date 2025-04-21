import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const posts = [
  {
    slug: "lumi",
    title: "elise lowkey gay",
    description: "say real",
  }
];

const Blog = () => {
  return (
    <motion.section
      className="w-full py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="max-w-screen-md mx-auto px-6 flex flex-col gap-6">
        <h2 className="text-3xl text-white font-bold tracking-wider">My Thoughts</h2>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Blog;