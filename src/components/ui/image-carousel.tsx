import React, { useState, useEffect, useRef, useCallback } from 'react';

type ImageCarouselProps = {
  images: string[];
  lightOn: boolean;
  interval?: number; // autoplay speed in ms
};

export default function ImageCarousel({
  images,
  lightOn,
  interval = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // start (or restart) autoplay
  const startAutoplay = useCallback(() => {
    // clear any existing interval first
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    if (!images || images.length === 0) return;
    autoplayRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
  }, [images, interval]);

  // stop autoplay (cleanup)
  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  // start autoplay on mount and whenever images/interval changes
  useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
  }, [startAutoplay, clearAutoplay]);

  // manual navigation helpers — restart autoplay after manual nav
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    startAutoplay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    startAutoplay();
  };

  // handle click/tap: left third = prev, right third = next
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const third = rect.width / 3;

    if (x < third) {
      prevSlide();
    } else if (x > third * 2) {
      nextSlide();
    } else {
      // middle third — ignore (keeps autoplay unperturbed)
    }
  };

  // touch support: handle simple taps (same logic)
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.changedTouches[0].clientX - rect.left;
    const third = rect.width / 3;

    if (x < third) {
      prevSlide();
    } else if (x > third * 2) {
      nextSlide();
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section
      className={`w-full min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${
        lightOn ? 'brightness-100' : 'brightness-20'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black -z-10 flex flex-col items-center justify-center">
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl cursor-pointer"
          onClick={handleClick}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="image carousel"
          aria-label="Image carousel - click left or right to navigate"
        >
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Slide ${idx + 1}`}
                className="w-full flex-shrink-0 object-cover"
                draggable={false}
              />
            ))}
          </div>

          {/* Optional: small overlay indicators to hint where to click */}
          <div className="pointer-events-none absolute inset-0 flex">
            <div className="w-1/3" />
            <div className="w-1/3 flex items-center justify-center">
              {/* center area left empty */}
            </div>
            <div className="w-1/3" />
          </div>
        </div>

        {/* dots for visual feedback */}
        <div className="flex gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                startAutoplay();
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex ? 'bg-emerald-400 scale-110' : 'bg-slate-600'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
