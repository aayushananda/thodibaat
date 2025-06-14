import React from "react";

const WavySeparator = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none">
      <div className="relative w-full h-full">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 L680,60 Q720,120 760,60 L1440,60 V120 H0 Z"
            className="fill-white"
          ></path>
        </svg>
        <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-green to-primary-green-light p-2">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <span className="text-primary-green-dark font-bold text-lg">
                  24/7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WavySeparator;
 