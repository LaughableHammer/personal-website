import React, { useState, useEffect, useRef, useCallback } from "react";

type ImageCarouselProps = {
  images: string[];
  lightOn: boolean;
  interval?: number;
  embedMode?: boolean; // <— NEW
};

export default function ImageCarousel({
  images,
  lightOn,
  interval = 5000,
  embedMode = false,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    autoplayRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
  }, [interval, images.length]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    startAutoplay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    startAutoplay();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const third = rect.width / 3;

    if (x < third) prevSlide();
    else if (x > third * 2) nextSlide();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.changedTouches[0].clientX - rect.left;
    const third = rect.width / 3;

    if (x < third) prevSlide();
    else if (x > third * 2) nextSlide();
  };

  if (!images || images.length === 0) return null;

  const CarouselContent = (
    <>
      <div
        className="relative w-full overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-black"
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0 bg-black">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="
                  w-full h-[70vh] max-h-[700px]
                  object-contain
                  select-none
                "
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 justify-center mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              startAutoplay();
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex
                ? "bg-emerald-400 scale-110"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>
    </>
  );

  // ==============
  // EMBED MODE
  // ==============
  if (embedMode) {
    return (
      <div className="w-full flex flex-col items-center">
        {CarouselContent}
      </div>
    );
  }

  // ==============
  // FULLSCREEN MODE
  // ==============
  return (
    <section
      className={`w-full min-h-screen flex flex-col items-center justify-center transition-all duration-700 ${
        lightOn ? "brightness-100" : "brightness-20"
      }`}
    >
      {CarouselContent}
    </section>
  );
}
