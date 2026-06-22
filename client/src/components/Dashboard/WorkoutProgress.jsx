import React from "react";

const WorkoutProgress = ({ progress }) => {
  const completedCount = progress.filter(
    (p) => p.completed
  ).length;

  const percentage =
    (completedCount / 7) * 100;

  return (
    <div className="bg-slate-800 rounded-3xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">
          📈 Weekly Progress
        </h3>

        <span className="text-green-400 font-semibold">
          {completedCount}/7 Days
        </span>
      </div>

      <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="text-sm text-gray-400 mt-3">
        {percentage.toFixed(0)}% Completed
      </p>
    </div>
  );
};

export default WorkoutProgress;