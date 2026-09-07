import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import Fuse from 'fuse.js';
import { ALL_TAGS, TAG_CLASSES } from '../blog-ui';
import {
  CHALLENGE_PROGRESS_EVENT,
  getSolvedChallenges,
  isDroneGalleryUnlocked,
  unlockDroneGallery,
} from '../challenge-progress';
import { ChallengeUnlock } from '../components/ChallengeUnlock';
import { PageHero } from '../components/PageHero';
import { posts, type Tag } from '../posts';

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<Tag | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState(() => new Set(getSolvedChallenges()));
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [droneUnlocked, setDroneUnlocked] = useState(isDroneGalleryUnlocked);
  const location = useLocation();
  const closeUnlock = useCallback(() => setUnlockOpen(false), []);

  useEffect(() => {
    const updateProgress = () => setSolvedChallenges(new Set(getSolvedChallenges()));
    window.addEventListener(CHALLENGE_PROGRESS_EVENT, updateProgress);
    window.addEventListener('storage', updateProgress);
    return () => {
      window.removeEventListener(CHALLENGE_PROGRESS_EVENT, updateProgress);
      window.removeEventListener('storage', updateProgress);
    };
  }, []);

  const allChallengesSolved = posts.length > 0 && posts.every((post) => solvedChallenges.has(post.slug));

  useEffect(() => {
    if (allChallengesSolved && location.pathname === '/blog' && !droneUnlocked) {
      unlockDroneGallery();
      setDroneUnlocked(true);
      setUnlockOpen(true);
    }
  }, [allChallengesSolved, droneUnlocked, location.pathname]);

  const fuse = useMemo(() => new Fuse(posts, {
    keys: ['title', 'summary'],
    threshold: 0.4,
  }), []);

  const filtered = useMemo(() => {
    let result = search
      ? fuse.search(search).map((entry) => entry.item)
      : [...posts].sort((a, b) => b.date.localeCompare(a.date));
    if (activeTag) result = result.filter((post) => post.tags.includes(activeTag));
    return result;
  }, [search, activeTag, fuse]);

  const categories = useMemo(() => {
    const requestedTags = activeTag ? [activeTag] : ALL_TAGS;
    return requestedTags
      .map((tag) => ({ tag, posts: filtered.filter((post) => post.tags.includes(tag)) }))
      .filter((category) => category.posts.length > 0);
  }, [activeTag, filtered]);

  return (
    <>
      <PageHero title="Challenges">
        <p>CTF writeups, CVEs, certs, and whatever else I feel like writing about.</p>
      </PageHero>

      <div className="site-container page-content">
        <div className="challenge-toolbar">
          <label className="search-field">
            <Search aria-hidden="true" />
            <span className="sr-only">Search posts</span>
            <input
              type="search"
              placeholder="Search posts..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <div className="tag-filters" aria-label="Filter challenges by tag">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`tag-button ${activeTag === tag ? TAG_CLASSES[tag] : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && <div className="empty-state">No posts found.</div>}

        {categories.map(({ tag, posts: categoryPosts }) => (
          <section className="challenge-category" key={tag} aria-labelledby={`category-${tag.replaceAll(' ', '-')}`}>
            <div className="category-heading">
              <h2 id={`category-${tag.replaceAll(' ', '-')}`}>{tag}</h2>
              <span>{categoryPosts.length} challenge{categoryPosts.length === 1 ? '' : 's'}</span>
            </div>
            <div className="challenge-grid">
              {categoryPosts.map((post) => (
                <Link
                  className={`challenge-card${solvedChallenges.has(post.slug) ? ' challenge-solved' : ''}`}
                  key={post.slug}
                  to={post.slug}
                  state={{ fromChallenges: true }}
                >
                  <div className="challenge-card-inner">
                    <p className="challenge-card-title">{post.title}</p>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-AU', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Outlet />
      {unlockOpen && <ChallengeUnlock onClose={closeUnlock} />}
    </>
  );
}
