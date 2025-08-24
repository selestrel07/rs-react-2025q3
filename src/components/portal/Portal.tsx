import { type FC, type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
  if (!isOpen) {
    document.body.style.overflow = '';
    return null;
  } else {
    document.body.style.overflow = 'hidden';
  }

  return createPortal(
    <div
      onClick={close}
      className="absolute flex justify-center items-center bg-gray-100 w-screen min-h-screen z-50 top-0 p-1"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-start items-end gap-2.5 w-1/2 min-h-full p-6 border-1 border-gray-400 rounded-2xl"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Portal;
