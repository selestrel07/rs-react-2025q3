import { type FC, type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../button/Button.tsx';

const Portal: FC<{
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}> = ({ children, isOpen, close }) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [isOpen]);
  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={close}
      className="absolute bg-gray-100 w-screen min-h-screen z-50 top-0 p-1"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-start items-end gap-2.5 w-8/12 min-h-full mx-auto p-6 border-1 border-gray-400 rounded-2xl"
      >
        <Button onClick={() => close()}>Close</Button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Portal;
