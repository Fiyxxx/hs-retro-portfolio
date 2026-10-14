import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { postMap } from "../../posts/postMap";

const Post = () => {
  const { slug } = useParams();
  const content = postMap[slug];

  if (!content) {
    return <div className="text-(--muted)">post not found.</div>;
  }

  return (
    <article className="reveal">
      <Link to="/writing" className="text-(--muted) transition-colors hover:text-(--ink)">
        ← writing
      </Link>
      <div className="post-body mt-6">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default Post;
