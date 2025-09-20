'use client';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Props = {
  onToggle: () => void;
};

export default function DrawstringCord({ onToggle }: Props) {
  const [pulled, setPulled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const swayX = useSpring(mouseX, { stiffness: 100, damping: 15 });
  const swayY = useSpring(mouseY, { stiffness: 80, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate relative mouse position
    const relativeX = (e.clientX - centerX) / 40;
    const relativeY = Math.max(0, (e.clientY - centerY) / 60); // Only allow downward pull

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    setPulled(true);
    onToggle();

    // Reset pull animation after a short delay
    setTimeout(() => setPulled(false), 300);
  };

  // Create rope segments with chaining effect
  const segments = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-[10vw] z-[9999] flex flex-col items-center cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Ceiling attachment */}
      <div className="w-6 h-3 bg-gray-600 rounded-b-md shadow-sm mb-1" />

      {/* Rope segments */}
      {segments.map((i) => {
        // Each segment inherits movement from previous segments with decay
        const segmentSwayX = useTransform(
          swayX,
          (value) => value * Math.pow(0.85, i), // Decreasing influence down the chain
        );

        const segmentSwayY = useTransform(
          swayY,
          (value) => value * Math.pow(0.9, i),
        );

        return (
          <motion.div
            key={i}
            style={{
              x: segmentSwayX,
              y: segmentSwayY,
              transformOrigin: 'top center',
            }}
            animate={{
              y: pulled ? i * 3 : 0, // Stretch effect when pulled
            }}
            transition={{
              delay: i * 0.02,
              type: 'spring',
              stiffness: 150,
              damping: 20,
            }}
            className={`
              relative
              ${i === 0 ? 'w-[4px] h-[20px]' : 'w-[3px] h-[18px]'}
              bg-gradient-to-b from-amber-900 via-amber-800 to-amber-700
              rounded-sm
              shadow-sm
              ${isHovered ? 'shadow-amber-900/30' : ''}
            `}
          >
            {/* Rope texture lines */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
            {i % 2 === 0 && (
              <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-amber-600/40" />
            )}
          </motion.div>
        );
      })}

      {/* Knob with enhanced interaction */}
      <motion.div
        style={{
          x: swayX,
          y: swayY,
        }}
        animate={{
          y: pulled ? 30 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        whileHover={{
          scale: 1.15,
          boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)',
        }}
        whileTap={{
          scale: 0.95,
          y: 5,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
        className={`
          relative
          w-6 h-6 
          rounded-full 
          bg-gradient-to-br from-amber-500 to-amber-700
          border-2 border-amber-800 
          shadow-lg
          ${isHovered ? 'shadow-amber-900/40' : 'shadow-amber-900/20'}
          transition-shadow duration-200
        `}
      >
        {/* Knob highlight */}
        <div className="absolute top-1 left-1 w-3 h-3 bg-amber-300/60 rounded-full blur-[1px]" />
      </motion.div>
    </div>
  );
}
