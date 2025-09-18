'use client';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export const LampContainer = ({
  className,
  lampOn = true,
}: {
  className?: string;
  lampOn?: boolean;
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-start w-full overflow-hidden',
        className,
      )}
    >
      <div className="relative flex w-full scale-y-125 items-center justify-center isolate">
        {/* LEFT glow */}
        <motion.div
          animate={{ opacity: lampOn ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
        />

        {/* RIGHT glow */}
        <motion.div
          animate={{ opacity: lampOn ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 [--conic-position:from_290deg_at_center_top]"
        />

        {/* Core glow */}
        <motion.div
          animate={{ opacity: lampOn ? 0.5 : 0 }}
          className="absolute inset-auto z-20 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 blur-3xl"
        />

        {/* Inner highlight */}
        <motion.div
          animate={{ opacity: lampOn ? 1 : 0 }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        />

        {/* Lamp edge line */}
        <motion.div
          animate={{ opacity: lampOn ? 1 : 0 }}
          className="absolute inset-auto z-40 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
        />
      </div>
    </div>
  );
};
