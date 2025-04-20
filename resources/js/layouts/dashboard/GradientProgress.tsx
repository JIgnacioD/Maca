// components/GradientProgress.tsx
import React from 'react';

interface Props { percent: number }

const GradientProgress: React.FC<Props> = ({ percent }) => {
  const safe = Math.max(0, Math.min(100, percent));
  const red = Math.round((100 - safe) * 2.55);
  const green = Math.round(safe * 2.55);
  const fillColor = `rgb(${red}, ${green}, 0)`;

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded overflow-hidden">
      <div
        className="h-full transition-all"
        style={{ width: `${safe}%`, backgroundColor: fillColor }}
      />
    </div>
  );
};

export default GradientProgress;
