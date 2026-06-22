import React from "react";

const WorkoutPlanCard = ({
  day,
  workout,
  progress,
  markDayComplete,
  viewWorkout,
}) => {
  const isRestDay = String(workout)
    .toLowerCase()
    .includes("rest");

  const isCompleted = progress?.some(
    (p) => p.day === day && p.completed
  );

  const exercises = String(workout)
    .split(/\d+\./)
    .filter(Boolean);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 rounded-3xl p-6 shadow-xl border backdrop-blur-md hover:-translate-y-1 transition-all duration-300
      ${
        isRestDay
          ? "bg-slate-800 border-yellow-500"
          : "bg-slate-800 border-blue-500"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">
          📅 {day}
        </h3>

        {isRestDay ? (
          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
            REST
          </span>
        ) : (
          <span className="bg-blue-500 px-3 py-1 rounded-full text-xs font-bold">
            WORKOUT
          </span>
        )}
      </div>

      {isRestDay ? (
        <div className="text-center py-8">
          <p className="text-5xl mb-3">😴</p>
          <p className="text-gray-300">
            Recovery Day
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Complete Button */}
          <button
            onClick={() =>
              markDayComplete(day, workout)
            }
            disabled={isCompleted}
            className={`w-full py-3 rounded-xl font-semibold transition
            ${
              isCompleted
                ? "bg-green-700 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isCompleted
              ? "✅ Completed"
              : "Mark As Completed"}
          </button>

          {/* View Workout */}
          <button
            onClick={() =>
              viewWorkout(day, workout)
            }
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold"
          >
            👀 View Workout
          </button>

          {/* Quick Preview */}
          <div className="bg-slate-700 rounded-xl p-3">
            <p className="text-sm text-gray-400 mb-2">
              Exercise Count
            </p>

            <p className="text-2xl font-bold text-blue-400">
              {exercises.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanCard;