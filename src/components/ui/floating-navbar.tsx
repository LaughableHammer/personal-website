"use client";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "flex max-w-fit fixed top-8 inset-x-0 mx-auto z-[5000] px-6 py-3 items-center justify-center space-x-6",
          "rounded-full backdrop-blur-md border border-emerald-400/30 shadow-lg shadow-emerald-500/10",
          "bg-slate-900/80 text-slate-200",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative flex items-center space-x-1 text-sm font-medium transition-colors duration-200",
              "hover:text-emerald-300"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
            {/* glowing underline on hover */}
            <span className="absolute -bottom-1 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 origin-left bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 transition-transform" />
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
