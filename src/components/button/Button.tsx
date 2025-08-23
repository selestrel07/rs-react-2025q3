import type { FC, ReactNode } from 'react';

const Button: FC<{ children: ReactNode; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 border-2 border-solid border-amber-300 bg-amber-200 rounded-2xl cursor-pointer hover:scale-105 transition duration-200 ease-linear"
    >
      {children}
    </button>
  );
};

export default Button;
