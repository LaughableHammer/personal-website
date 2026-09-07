import { Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound({ drone = false }: { drone?: boolean }) {
  return (
    <section className="not-found-page">
      <div className="not-found-code">404</div>
      <Flag aria-hidden="true" />
      <h1>{drone ? "404 i haven't added content yet error :(" : 'Page not found.'}</h1>
      <p>The flag you were looking for is not here.</p>
      <Link className="primary-button" to="/">Return to profile</Link>
    </section>
  );
}
