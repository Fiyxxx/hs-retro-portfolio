import { Link } from "react-router-dom";

const posts = [
  {
    slug: "startup-takeaways",
    title: "my takeaways 8 months deep in a startup",
    date: "30/4/26",
  },
];

const Writing = () => {
  return (
    <section className="reveal">
      <h1 className="mb-2 text-(--muted)">writing</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="flex items-baseline justify-between gap-4">
            <Link to={`/writing/${post.slug}`} className="mark">
              <span className="link">{post.title}</span>
            </Link>
            <span className="shrink-0 text-[13px] tabular-nums text-(--muted)">{post.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Writing;
