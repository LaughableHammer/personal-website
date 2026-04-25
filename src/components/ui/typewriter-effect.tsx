'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const word = WORDS[wordIndex];

    if (!deleting && charCount === word.length) {
      // Fully typed — pause then start deleting
      timeoutRef.current = setTimeout(
        () => setState(s => ({ ...s, deleting: true })),
        PAUSE_AFTER_TYPE,
      );
    } else if (deleting && charCount === 0) {
      // Fully deleted — pause then move to next word
      timeoutRef.current = setTimeout(
        () => setState(s => ({
          wordIndex: (s.wordIndex + 1) % WORDS.length,
          charCount: 0,
          deleting: false,
        })),
        PAUSE_AFTER_DELETE,
      );
    } else {
      timeoutRef.current = setTimeout(
        () => setState(s => ({ ...s, charCount: s.charCount + (deleting ? -1 : 1) })),
        deleting ? DELETE_SPEED : TYPE_SPEED,
      );
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [wordIndex, charCount, deleting]);

  const displayed = WORDS[wordIndex].slice(0, charCount);

  return (
    <div className="flex flex-col items-center my-6 space-y-2 text-center">
      <span className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent">
        Hi, I&apos;m
      </span>
      <div className="flex items-center justify-center space-x-1 h-[3.5rem] sm:h-[4rem] md:h-[5rem] lg:h-[6rem]">
        <span className={cn('pb-2 text-4xl md:text-6xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent')}>
          {displayed}
        </span>
        <span className="block rounded-sm w-[3px] h-6 sm:h-16 lg:h-10 bg-white animate-[blink_0.8s_step-start_infinite]" />
      </div>
    </div>
  );
}