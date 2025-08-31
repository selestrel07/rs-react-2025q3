import { type FC } from 'react';

const Loader: FC = () => {
  return (
    <div className="flex items-center h-screen">
      <div className="w-3.5 h-3.5 animate-spin m-auto">
        <div className="w-full h-1/2 flex justify-between">
          <div className="w-1.5 h-1.5 bg-blue-100"></div>
          <div className="w-1.5 h-1.5 bg-blue-200"></div>
        </div>
        <div className="w-full h-1/2 flex justify-between">
          <div className="w-1.5 h-1.5 bg-blue-400"></div>
          <div className="w-1.5 h-1.5 bg-blue-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
