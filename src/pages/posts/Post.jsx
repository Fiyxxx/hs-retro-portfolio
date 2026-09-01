import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { postMap } from "../../posts/postMap";

const Post = () => {
  const { slug } = useParams();
  const content = postMap[slug];

  if (!content) {
    return (
      <div className="py-10 text-(--ink)">
        404: Post not found
      </div>
    );
  }

  return (
    <div className="py-10">
      <Link
        to="/writing"
        className="text-[13px] text-(--muted) transition-colors hover:text-(--accent)"
      >
        ← Writing
      </Link>
      <div className="prose prose-sm prose-invert light:prose-neutral mt-6 max-w-none text-(--ink)">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Post;
