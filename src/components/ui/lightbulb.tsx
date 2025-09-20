"use client";
import { motion } from "motion/react";

export default function LightBulb({
  lampOn,
  width = 480,
  height = 32,
}: {
  lampOn: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[1000] overflow-visible"
      style={{ width, height: Math.max(height + 400, 600) }} // Much larger container for glow
    >
      {/* Circular glow effect */}
      <motion.div
        className="fixed top-8 left-1/2 -translate-x-1/2 pointer-events-none z-[999]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: lampOn
            ? [0, 0.3, 0.15, 0.4, 0.25, 0.35, 0.3] // Sharp flickering
            : 0,
          scale: lampOn
            ? [0.5, 1.2, 1, 1.3, 1.1, 1.25, 1.2] // Scale variations during flicker
            : 0.5,
        }}
        transition={{
          duration: lampOn ? 2.5 : 0.6,
          ease: [0.25, 0.1, 0.25, 1], // Sharp easing for realistic flicker
          times: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
        }}
      >
        {/* Multiple overlapping circular glows for realistic falloff */}
        <div className="relative">
          {/* Innermost bright glow */}
          <div 
            className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(224,247,255,0.6) 0%, rgba(96,165,250,0.3) 20%, rgba(59,130,246,0.15) 40%, rgba(59,130,246,0.08) 60%, transparent 80%)',
            }}
          />
          {/* Middle glow */}
          <div 
            className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, transparent 0%, rgba(96,165,250,0.12) 30%, rgba(59,130,246,0.06) 50%, rgba(59,130,246,0.03) 70%, transparent 85%)',
            }}
          />
          {/* Outer subtle glow */}
          <div 
            className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle, transparent 0%, rgba(96,165,250,0.05) 40%, rgba(59,130,246,0.025) 60%, rgba(59,130,246,0.015) 80%, transparent 95%)',
            }}
          />
        </div>
      </motion.div>

      <svg
        viewBox="0 0 480 32"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height={height}
        className="relative z-10"
      >
        <defs>
          {/* Glass gradients */}
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
          
          {/* Metallic caps */}
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>
          
          {/* Enhanced tube glow with sharper transitions */}
          <linearGradient id="tubeGlowLinear" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="5%" stopColor="#e0f7ff" stopOpacity="0.3" />
            <stop offset="15%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="95%" stopColor="#e0f7ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
          
          {/* Intense center glow */}
          <linearGradient id="centerGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Main glow layer with realistic flickering */}
        <motion.rect
          x="20"
          y="0"
          width="440"
          height="32"
          fill="url(#tubeGlowLinear)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: lampOn
              ? [0, 0.2, 0, 0.8, 0.3, 1, 0.7, 1, 0.9, 1] // More erratic flicker pattern
              : 0,
          }}
          transition={{
            duration: lampOn ? 3 : 0.5,
            ease: [0.4, 0, 0.6, 1], // Sharp, realistic easing
            times: [0, 0.05, 0.1, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
          }}
        />

        {/* Intense center hot spot */}
        <motion.rect
          x="180"
          y="6"
          width="120"
          height="20"
          fill="url(#centerGlow)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: lampOn
              ? [0, 0.4, 0.1, 0.9, 0.5, 1, 0.8, 1] // Flickering hot spot
              : 0,
          }}
          transition={{
            duration: lampOn ? 2.8 : 0.4,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.08, 0.15, 0.25, 0.4, 0.6, 0.8, 1],
          }}
        />

        {/* Glass body */}
        <rect
          x="30"
          y="8"
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
        <rect x="20" y="6" width="12" height="20" rx="2" fill="url(#metal)" />
        <rect x="448" y="6" width="12" height="20" rx="2" fill="url(#metal)" />

        {/* Filament simulation */}
        <motion.line
          x1="50"
          y1="16"
          x2="430"
          y2="16"
          stroke="#ffffff"
          strokeWidth="0.5"
          opacity={lampOn ? 0.8 : 0}
          animate={{
            opacity: lampOn
              ? [0, 0.3, 0.1, 0.8, 0.4, 1, 0.7, 0.9, 1]
              : 0,
          }}
          transition={{
            duration: lampOn ? 2.2 : 0.3,
            times: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 0.8, 0.9, 1],
          }}
        />
      </svg>
    </div>
  );
}






// "use client";
// import { motion } from "motion/react";

// export default function LightBulb({
//   lampOn,
//   width = 480,
//   height = 32,
// }: {
//   lampOn: boolean;
//   width?: number;
//   height?: number;
// }) {
//   return (
//     <div
//       className="fixed top-0 left-1/2 -translate-x-1/2 z-[1000]"
//       style={{ width, height }}
//     >
//       <svg
//         viewBox="0 0 480 32"
//         xmlns="http://www.w3.org/2000/svg"
//         width="100%"
//         height="100%"
//       >
//         <defs>
//           {/* Glass gradients */}
//           <linearGradient id="glassHorizontal" x1="0" y1="0" x2="1" y2="0">
//             <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.15" />
//             <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
//             <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.15" />
//           </linearGradient>
//           <linearGradient id="glassVertical" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.2" />
//             <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.1" />
//             <stop offset="100%" stopColor="#0f172a" stopOpacity="0.25" />
//           </linearGradient>

//           {/* Metallic caps */}
//           <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#d1d5db" />
//             <stop offset="50%" stopColor="#9ca3af" />
//             <stop offset="100%" stopColor="#6b7280" />
//           </linearGradient>

//           {/* Full-length glow */}
//           <linearGradient id="tubeGlowLinear" x1="0" y1="0" x2="1" y2="0">
//             <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
//             <stop offset="10%" stopColor="#e0f7ff" stopOpacity="0.6" />
//             <stop offset="50%" stopColor="white" stopOpacity="1" />
//             <stop offset="90%" stopColor="#e0f7ff" stopOpacity="0.6" />
//             <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
//           </linearGradient>
//         </defs>

//         {/* Uniform glow layer */}
//         <motion.rect
//           x="20"
//           y="0"
//           width="440"
//           height="32"
//           fill="url(#tubeGlowLinear)"
//           initial={{ opacity: 0 }}
//           animate={{
//             opacity: lampOn
//               ? [0, 1, 0.7, 1, 0.9, 1] // flicker pulses
//               : 0,
//           }}
//           transition={{
//             duration: lampOn ? 1.5 : 0.4,
//             ease: "easeInOut",
//             times: [0, 0.2, 0.35, 0.5, 0.7, 1],
//           }}
//         />

//         {/* Glass body */}
//         <rect
//           x="30"
//           y="8"
//           width="420"
//           height="16"
//           rx="8"
//           fill="url(#glassHorizontal)"
//         />
//         <rect
//           x="30"
//           y="8"
//           width="420"
//           height="16"
//           rx="8"
//           fill="url(#glassVertical)"
//           stroke="#94a3b8"
//           strokeWidth="0.4"
//         />

//         {/* End caps */}
//         <rect x="20" y="6" width="12" height="20" rx="2" fill="url(#metal)" />
//         <rect x="448" y="6" width="12" height="20" rx="2" fill="url(#metal)" />
//       </svg>
//     </div>
//   );
// }
