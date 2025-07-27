import type { FC, ReactNode } from 'react';

export const NotFoundPage: FC = (): ReactNode => {
  return (
    <div className="not-found-container">
      <p>
        Oops! It looks like the page you requested wasn&apos;t found! Please use
        the header links to navigate to one of the existing pages.
      </p>
    </div>
  );
};
