import { useEffect, useRef, useState } from 'react';

const WORDS = ['LaughableHammer', 'Kushaagra'];
const TYPE_SPEED = 150;
const DELETE_SPEED = 80;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

export default function TypewriterCycle() {
  const [{ wordIndex, charCount, deleting }, setState] = useState({
    wordIndex: 0,
    charCount: 0,
    deleting: false,
  });
  const [reduceMotion, setReduceMotion] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(query.matches);
    updatePreference();
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const word = WORDS[wordIndex];

    if (!deleting && charCount === word.length) {
      timeoutRef.current = setTimeout(
        () => setState((state) => ({ ...state, deleting: true })),
        PAUSE_AFTER_TYPE,
      );
    } else if (deleting && charCount === 0) {
      timeoutRef.current = setTimeout(
        () => setState((state) => ({
          wordIndex: (state.wordIndex + 1) % WORDS.length,
          charCount: 0,
          deleting: false,
        })),
        PAUSE_AFTER_DELETE,
      );
    } else {
      timeoutRef.current = setTimeout(
        () => setState((state) => ({ ...state, charCount: state.charCount + (deleting ? -1 : 1) })),
        deleting ? DELETE_SPEED : TYPE_SPEED,
      );
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [wordIndex, charCount, deleting, reduceMotion]);

  return (
    <div className="identity-heading">
      <span className="identity-kicker">Hi, I&apos;m</span>
      <h1>
        {reduceMotion ? WORDS.join(' / ') : WORDS[wordIndex].slice(0, charCount)}
        {!reduceMotion && <span className="typing-cursor" aria-hidden="true" />}
      </h1>
      <span className="sr-only">LaughableHammer, Kushaagra</span>
    </div>
  );
}
