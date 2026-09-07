import type { Tag } from './posts';

export const ALL_TAGS: Tag[] = ['CTF Writeup', 'CVE', 'Certification', 'Education', 'Project'];

export const TAG_CLASSES: Record<Tag, string> = {
  'CTF Writeup': 'tag-green',
  CVE: 'tag-red',
  Certification: 'tag-blue',
  Education: 'tag-purple',
  Project: 'tag-amber',
};
