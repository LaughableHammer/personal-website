'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function TypewriterCycle() {
  const words = ['Kushaagra', 'LaughableHammer'];
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (pause) {
      timeout = setTimeout(() => setPause(false), 2000); // 2 sec pause
    } else {
      timeout = setTimeout(
        () => {
          if (!deleting) {
            // Typing forward
            if (displayed.length < currentWord.length) {
              setDisplayed(currentWord.slice(0, displayed.length + 1));
            } else {
              // full word typed → pause then delete
              setPause(true);
              setTimeout(() => setDeleting(true), 2000);
            }
          } else {
            // Deleting backward
            if (displayed.length > 0) {
              setDisplayed(currentWord.slice(0, displayed.length - 1));
            } else {
              // switch word
              setDeleting(false);
              setWordIndex((wordIndex + 1) % words.length);
            }
          }
        },
        deleting ? 80 : 150,
      ); // typing speed vs deleting speed
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, pause, wordIndex]);

  return (
    <div className="flex flex-col items-center my-6 space-y-2 text-center">
      {/* Fixed part */}
      <span className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent">
        Hi, I&apos;m
      </span>

      {/* Changing word */}
      <div className="flex items-center justify-center space-x-1 h-[3.5rem] sm:h-[4rem] md:h-[5rem] lg:h-[6rem]">
        <span
          className={cn(
            'pb-2 text-4xl md:text-6xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent',
          )}
        >
          {displayed}
        </span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="block rounded-sm w-[3px] h-6 sm:h-16 lg:h-10 bg-white"
        />
      </div>
    </div>
  );
}
