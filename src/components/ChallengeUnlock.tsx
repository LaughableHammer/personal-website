import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { Dialog } from './ui/dialog';

const colours = ['#ffca2c', '#29c830', '#0d6efd', '#dc3545', '#d63384', '#6f42c1'];
const confetti = Array.from({ length: 72 }, (_, index) => ({
  colour: colours[index % colours.length],
  delay: -((index * 0.13) % 3.8),
  duration: 3.2 + ((index * 7) % 18) / 10,
  left: (index * 37) % 100,
  drift: ((index * 29) % 31) - 15,
}));

interface ChallengeUnlockProps {
  onClose: () => void;
}

export function ChallengeUnlock({ onClose }: ChallengeUnlockProps) {
  return (
    <>
      <div className="confetti" aria-hidden="true">
        {confetti.map((piece, index) => (
          <span
            key={index}
            style={{
              '--confetti-drift': `${piece.drift}vw`,
              left: `${piece.left}%`,
              backgroundColor: piece.colour,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
            } as CSSProperties}
          />
        ))}
      </div>
      <Dialog title="Secret unlocked!" onClose={onClose}>
        <div className="unlock-message">
          <div className="unlock-copy">
            <Trophy aria-hidden="true" />
            <p>You submitted every challenge and unlocked the secret drone images.</p>
          </div>
          <Link className="primary-button" to="/drone" onClick={onClose}>
            View drone images
          </Link>
        </div>
      </Dialog>
    </>
  );
}
