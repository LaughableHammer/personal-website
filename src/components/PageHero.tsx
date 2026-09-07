import type { ReactNode } from 'react';

export function PageHero({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="page-hero">
      <div className="site-container">
        <h1>{title}</h1>
        {children}
      </div>
    </header>
  );
}
