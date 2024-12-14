import React from 'react';

export const ProgressBar = ({ progress, currentStage }) => {
  const svgSize = 300;
  const strokeWidth = 20;
  const radius = svgSize / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-full h-[300px]">
      <svg className="w-full h-full" viewBox={`0 0 ${svgSize} ${svgSize}`}>
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={currentStage ? currentStage.color : 'gray'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 40) * circumference}
          transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-4xl font-bold">{Math.round((progress / 40) * 100)}%</span>
        <br />
        <span className="text-lg">Complete</span>
      </div>
    </div>
  );
};

