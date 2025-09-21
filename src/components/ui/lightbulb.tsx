'use client';
import { motion } from 'motion/react';

export default function LightBulb({
  lampOn,
  height = 32,
}: {
  lampOn: boolean;
  height?: number;
}) {
  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[1000] overflow-visible"
      style={{
        width: '70vw',          // take most of screen width
        maxWidth: '640px',      // cap size on large screens
        height: 10,// Math.max(height + 400, 600), // large glow container
      }}
    >
      {/* Circular glow effect */}
      <motion.div
        className="fixed top-8 left-1/2 -translate-x-1/2 pointer-events-none z-[999]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: lampOn
            ? [0, 0.3, 0.15, 0.4, 0.25, 0.35, 0.3]
            : 0,
          scale: lampOn
            ? [0.5, 1.2, 1, 1.3, 1.1, 1.25, 1.2]
            : 0.5,
        }}
        transition={{
          duration: lampOn ? 2.5 : 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          times: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
        }}
      >
        {/* Multiple overlapping glows */}
        <div className="relative">
          <div
            className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '60vw',
              maxWidth: '500px',
              height: '60vw',
              maxHeight: '500px',
              background:
                'radial-gradient(circle, rgba(224,247,255,0.6) 0%, rgba(96,165,250,0.3) 20%, rgba(59,130,246,0.15) 40%, rgba(59,130,246,0.08) 60%, transparent 80%)',
            }}
          />
          <div
            className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '80vw',
              maxWidth: '700px',
              height: '80vw',
              maxHeight: '700px',
              background:
                'radial-gradient(circle, transparent 0%, rgba(96,165,250,0.12) 30%, rgba(59,130,246,0.06) 50%, rgba(59,130,246,0.03) 70%, transparent 85%)',
            }}
          />
        </div>
      </motion.div>

      {/* Lamp tube */}
      <svg
        viewBox="0 0 480 32"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height={height}
        className="relative z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="glassHorizontal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="glassVertical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>
          <linearGradient id="tubeGlowLinear" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="5%" stopColor="#e0f7ff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="95%" stopColor="#e0f7ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Glow layer */}
        <motion.rect
          x="20"
          y="9"
          width="440"
          height="16"
          fill="url(#tubeGlowLinear)"
          initial={{ opacity: 0 }}
          animate={{ opacity: lampOn ? [0, 1, 0.6, 1, 0.9, 1] : 0 }}
          transition={{
            duration: lampOn ? 2 : 0.5,
            ease: 'easeInOut',
          }}
        />

        {/* Glass */}
        <rect
          x="30"
          y="10"
          width="420"
          height="16"
          rx="8"
          fill="url(#glassHorizontal)"
        />
        <rect
          x="30"
          y="8"
          width="420"
          height="16"
          rx="8"
          fill="url(#glassVertical)"
          stroke="#94a3b8"
          strokeWidth="0.4"
        />

        {/* End caps */}
        <rect x="23" y="0" width="8" height="25" rx="2" fill="url(#metal)" />
        <rect x="448" y="0" width="8" height="25" rx="2" fill="url(#metal)" />
      </svg>
    </div>
  );
}
