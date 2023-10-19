import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center mt-56">
      <span
        className="animate-spin inline-block w-12 h-12 border-[4px] text-center border-current border-t-transparent text-primary rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </span>
    </div>
  );
};

export default Loading;
