import { Link } from "react-router-dom";

const posts = [
  {
    slug: "startup-takeaways",
    title: "my takeaways 8 months deep in a startup",
    description: "30/4/26",
  },
];

const Writing = () => {
  return (
    <section className="w-full py-10">
      <div className="flex flex-col gap-8">
        <h1 className="text-[16px] font-semibold text-(--ink)">Writing</h1>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} to={`/writing/${post.slug}`} className="group">
              <h2 className="text-[15px] font-semibold text-(--ink) transition-colors group-hover:text-(--accent)">
                {post.title}
              </h2>
              <p className="text-[13px] text-(--muted)">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writing;
