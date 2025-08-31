import type { FC, ReactNode } from 'react';

const Button: FC<{ children: ReactNode; onClick: () => void }> = ({
  children,
                                                                    onClick,
}) => {
  return (
    <button
      className="border-1 px-2.5 rounded-sm cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
