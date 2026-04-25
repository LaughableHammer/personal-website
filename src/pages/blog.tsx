import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { posts, type Tag } from '../posts';

const ALL_TAGS: Tag[] = ['CTF Writeup', 'CVE', 'Certification', 'Education', 'Project'];

const TAG_COLOURS: Record<Tag, string> = {
  'CTF Writeup':   'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
  'CVE':           'bg-red-900/60 text-red-300 border-red-700/50',
  'Certification': 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  'Education':     'bg-purple-900/60 text-purple-300 border-purple-700/50',
  'Project':       'bg-amber-900/60 text-amber-300 border-amber-700/50',
};

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<Tag | null>(null);

  const fuse = useMemo(() => new Fuse(posts, {
    keys: ['title', 'summary'],
    threshold: 0.4,
  }), []);

  const filtered = useMemo(() => {
    let result = search
      ? fuse.search(search).map(r => r.item)
      : [...posts].sort((a, b) => b.date.localeCompare(a.date));
    if (activeTag) result = result.filter(p => p.tags.includes(activeTag));
    return result;
  }, [search, activeTag, fuse]);

  return (
    <section className="min-h-screen px-6 sm:px-12 py-20 bg-gradient-to-b from-black via-slate-900 to-slate-950">
      <div className="max-w-3xl mx-auto space-y-10">

        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-300 to-cyan-400 bg-clip-text text-transparent pb-2">
            Blog
          </h1>
          <p className="text-slate-400">CTF writeups, CVEs, certs, and whatever else I feel like writing about.</p>
        </div>

        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
        />

        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                activeTag === tag
                  ? TAG_COLOURS[tag]
                  : 'bg-slate-900/40 text-slate-400 border-slate-700/40 hover:border-slate-500'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 && (
            <p className="text-slate-500 text-center py-12">No posts found.</p>
          )}
          {filtered.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block group bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(tag => (
                  <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium border ${TAG_COLOURS[tag]}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors mb-1">
                {post.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">{post.summary}</p>
              <p className="text-slate-600 text-xs mt-3">
                {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}