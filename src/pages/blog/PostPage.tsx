import { useCallback, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Dialog } from '../../components/ui/dialog';
import { getSolvedChallenges, markChallengeSolved } from '../../challenge-progress';
import { getPost } from '../../posts';
import { TAG_CLASSES } from '../../blog-ui';

export default function PostPage() {
  const { slug } = useParams();
  const post = getPost(slug ?? '');
  const [solved, setSolved] = useState(() => getSolvedChallenges().includes(slug ?? ''));
  const navigate = useNavigate();
  const location = useLocation();
  const fromChallenges = Boolean((location.state as { fromChallenges?: boolean } | null)?.fromChallenges);

  const close = useCallback(() => {
    if (fromChallenges) navigate(-1);
    else navigate('/blog', { replace: true });
  }, [fromChallenges, navigate]);

  const submitChallenge = () => {
    if (!post || solved) return;
    markChallengeSolved(post.slug);
    setSolved(true);
  };

  if (!post) {
    return (
      <Dialog title="Post not found." onClose={close}>
        <p className="empty-state compact">Post not found.</p>
      </Dialog>
    );
  }

  return (
    <Dialog title={post.title} onClose={close} wide>
      <div className="post-meta">
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className={`content-tag ${TAG_CLASSES[tag]}`}>{tag}</span>
          ))}
        </div>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-AU', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </time>
      </div>
      <p className="post-summary">{post.summary}</p>
      <article className="post-article">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </article>
      <div className="challenge-submit-row">
        <button
          type="button"
          className={`submit-button${solved ? ' is-solved' : ''}`}
          onClick={submitChallenge}
          disabled={solved}
        >
          {solved ? 'Solved' : 'Submit'}
        </button>
        <span className="sr-only" aria-live="polite">{solved ? 'Challenge solved' : ''}</span>
      </div>
    </Dialog>
  );
}
