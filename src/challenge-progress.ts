const STORAGE_KEY = 'solved-blog-challenges';
export const CHALLENGE_PROGRESS_EVENT = 'challenge-progress-change';

export function getSolvedChallenges(): string[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return [];
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((slug): slug is string => typeof slug === 'string') : [];
  } catch {
    return [];
  }
}

export function markChallengeSolved(slug: string) {
  const solved = new Set(getSolvedChallenges());
  solved.add(slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...solved]));
  window.dispatchEvent(new CustomEvent(CHALLENGE_PROGRESS_EVENT, { detail: slug }));
}
