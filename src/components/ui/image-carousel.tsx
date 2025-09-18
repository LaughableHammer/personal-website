import { useState, useEffect } from 'react';

type ImageCarouselProps = {
  images: string[];
  lightOn: boolean;
  interval?: number; // autoplay speed in ms
};

export default function ImageCarousel({
  images,
  lightOn,
  interval = 3000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const autoplay = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(autoplay);
  }, [images, interval]);

  return (
    <section
      className={`w-full min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${
        lightOn ? 'brightness-100' : 'brightness-50'
      }`}
    >
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`SecSoc ${idx + 1}`}
              className="w-full flex-shrink-0 object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
