"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarProps {
  progress: number;
  level: number;
  strokeWidth?: number;
}

const LEVEL_COLORS: Record<number, string> = {
  1: "#FF5733",
  2: "#33FF57",
  3: "#179DD7",
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  level,
  strokeWidth = 10,
}) => {
  const color = LEVEL_COLORS[level] || "#CCC"; 

  return (
    <div className="relative w-20 h-20">
      <CircularProgressbar
        value={progress}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#444",
          strokeLinecap: "round",
          pathTransitionDuration: 0.5,
        })}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="pb-1 text-4xl font-extrabold"
          style={{ color: color }}
        >
          {level}
        </span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
