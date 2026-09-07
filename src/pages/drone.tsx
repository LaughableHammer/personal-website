import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const dronePhotos = [
  { src: '/images/drone/mountain-lake-moonrise.jpg', alt: 'Moonrise over a mountain lake' },
  { src: '/images/drone/misty-river-gorge.jpg', alt: 'A misty river gorge and mountain road' },
  { src: '/images/drone/pink-salt-lake.jpg', alt: 'A pink salt lake beside the coast' },
  { src: '/images/drone/turquoise-coast.jpg', alt: 'Turquoise water meeting a sandy beach from above' },
  { src: '/images/drone/mural-dam.jpg', alt: 'A mural-covered dam surrounded by forest' },
  { src: '/images/drone/forest-reservoir-sunset.jpg', alt: 'Sunset over a forest reservoir' },
  { src: '/images/drone/beach-group.jpg', alt: 'A group gathered beside a broad sandy beach' },
  { src: '/images/drone/green-mountain-valley.jpg', alt: 'A green valley between steep mountains' },
  { src: '/images/drone/mountain-lake-road.jpg', alt: 'A winding road beside a blue mountain lake' },
  { src: '/images/drone/braided-river-valley.jpg', alt: 'A braided river flowing through a mountain valley' },
  { src: '/images/drone/turquoise-river-delta.jpg', alt: 'Turquoise river channels spreading across a valley floor' },
];

export default function Drone() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const closeLightbox = useCallback(() => setSelectedPhoto(null), []);

  useEffect(() => {
    if (selectedPhoto === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [closeLightbox, selectedPhoto]);

  return (
    <>
      <section className="drone-page" aria-labelledby="drone-heading">
        <header className="drone-header">
          <h1 id="drone-heading">Drone</h1>
          <p>Some cool drone photos.</p>
        </header>
        <div className="drone-grid">
          {dronePhotos.map((photo, index) => (
            <button
              className="drone-tile"
              key={photo.src}
              type="button"
              aria-label={`View larger: ${photo.alt}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setSelectedPhoto(index);
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </button>
          ))}
        </div>
      </section>

      {selectedPhoto !== null && (
        <div
          className="drone-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={dronePhotos[selectedPhoto].alt}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <button
            ref={closeRef}
            className="drone-lightbox-close"
            type="button"
            onClick={closeLightbox}
            aria-label="Close enlarged photo"
          >
            <X aria-hidden="true" />
          </button>
          <div className="drone-lightbox-image">
            <img
              src={dronePhotos[selectedPhoto].src}
              alt={dronePhotos[selectedPhoto].alt}
            />
          </div>
        </div>
      )}
    </>
  );
}
