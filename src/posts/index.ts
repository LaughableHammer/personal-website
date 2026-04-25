import type { Tag } from './types';
export type { Tag };

export interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: Tag[];
  content: string;
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, unknown> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    // parse arrays like: [CTF Writeup, CVE]
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    } else {
      data[key] = val;
    }
  }

  return { data, content: match[2] };
}

const modules = import.meta.glob('./*.md', { eager: true, query: '?raw', import: 'default' });

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.replace('./', '').replace('.md', '');
    const { data, content } = parseFrontmatter(raw as string);
    return {
      slug,
      title:   typeof data.title   === 'string' ? data.title   : slug,
      summary: typeof data.summary === 'string' ? data.summary : '',
      date:    typeof data.date    === 'string' ? data.date    : '',
      tags:    Array.isArray(data.tags) ? data.tags as Tag[]   : [],
      content,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}