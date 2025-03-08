
import React from 'react';

interface ThreadListLoaderProps {
  loading: boolean;
}

const ThreadListLoader: React.FC<ThreadListLoaderProps> = ({ loading }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-2 h-2 bg-[#edb067] rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-[#edb067] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-[#edb067] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

export default ThreadListLoader;
