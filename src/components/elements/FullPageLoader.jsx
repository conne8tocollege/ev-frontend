import React from "react";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-[#fcc895] flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-2">
        {/* <img
          src="assets/images/800bbattery.png"
          alt="Loading"
          className="w-40 h-auto"
        /> */}

        <div className="text-4xl font-semibold text-gray-700">
          Loading
          <span className="dot-1 animate-ping"> .</span>
          <span className="dot-2 animate-ping delay-200">.</span>
          <span className="dot-3 animate-ping delay-400">.</span>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
