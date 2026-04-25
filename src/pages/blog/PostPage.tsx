import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { getPost, type Tag } from '../../posts';

const TAG_COLOURS: Record<Tag, string> = {
  'CTF Writeup':   'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
  'CVE':           'bg-red-900/60 text-red-300 border-red-700/50',
  'Certification': 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  'Education':     'bg-purple-900/60 text-purple-300 border-purple-700/50',
  'Project':       'bg-amber-900/60 text-amber-300 border-amber-700/50',
};

export default function PostPage() {
  const { slug } = useParams();
  const post = getPost(slug ?? '');

  if (!post) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-black text-slate-400">
        <p className="text-2xl mb-4">Post not found.</p>
        <Link to="/blog" className="text-emerald-400 hover:underline">← Back to blog</Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 sm:px-12 py-20 bg-gradient-to-b from-black via-slate-900 to-slate-950">
      <div className="max-w-3xl mx-auto space-y-8">

        <Link to="/blog" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">
          ← Back to blog
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium border ${TAG_COLOURS[tag]}`}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">{post.title}</h1>
          <p className="text-slate-500 text-sm">
            {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <article className="prose prose-invert prose-emerald max-w-none
          prose-headings:text-slate-100
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
          prose-code:text-emerald-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded
          prose-pre:bg-transparent prose-pre:p-0
          prose-strong:text-slate-200
          prose-li:text-slate-300
          prose-blockquote:border-emerald-500 prose-blockquote:text-slate-400">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </article>

      </div>
    </section>
  );
}