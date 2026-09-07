import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css';
import { Dialog } from '../../components/ui/dialog';
import { getSolvedChallenges, markChallengeSolved } from '../../challenge-progress';
import { getPost } from '../../posts';
import { TAG_CLASSES } from '../../blog-ui';

interface TableOfContentsEntry {
  id: string;
  level: 1 | 2;
  title: string;
}

export default function PostPage() {
  const { slug } = useParams();
  const post = getPost(slug ?? '');
  const [solved, setSolved] = useState(() => getSolvedChallenges().includes(slug ?? ''));
  const navigate = useNavigate();
  const location = useLocation();
  const articleRef = useRef<HTMLElement>(null);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsEntry[]>([]);
  const fromChallenges = Boolean((location.state as { fromChallenges?: boolean } | null)?.fromChallenges);

  useLayoutEffect(() => {
    if (!post) {
      setTableOfContents([]);
      return;
    }

    const entries = Array.from(articleRef.current?.querySelectorAll<HTMLHeadingElement>('h1, h2') ?? [])
      .filter((heading) => heading.id && heading.textContent?.trim())
      .map((heading) => ({
        id: heading.id,
        level: Number(heading.tagName.slice(1)) as 1 | 2,
        title: heading.textContent!.trim(),
      }));
    setTableOfContents(entries);
  }, [post]);

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
      {!post.youtubeId && <p className="post-summary">{post.summary}</p>}
      {tableOfContents.length > 0 && (
        <details className="post-toc" open>
          <summary>Table of contents</summary>
          <nav aria-label="Table of contents">
            <ol>
              {tableOfContents.map((heading) => (
                <li key={heading.id} className={`toc-level-${heading.level}`}>
                  <a href={`#${heading.id}`}>{heading.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </details>
      )}
      <article className="post-article" ref={articleRef}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSlug]}>
          {post.content}
        </ReactMarkdown>
        {post.youtubeId && (
          <div className="post-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${post.youtubeId}?start=${post.youtubeStart ?? 0}`}
              title={`${post.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}
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
