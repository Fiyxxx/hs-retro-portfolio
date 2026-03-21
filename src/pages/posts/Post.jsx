import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { postMap } from '../../posts/postMap';

const Post = () => {
  const { slug } = useParams();
  const content = postMap[slug];

  if (!content) return <div className="text-white light:text-black p-6">404: Post not found</div>;

  return (
    <div className="max-w-none mx-auto px-6 py-10 text-white light:text-black prose prose-invert light:prose-neutral">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Post;