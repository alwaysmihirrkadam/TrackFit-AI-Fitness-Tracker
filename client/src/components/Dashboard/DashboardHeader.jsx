import React from "react";

const DashboardHeader = ({
  loadingAiCoach,
  getAiAdvice,
  setPlanModalOpen,
  setIsModalOpen,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Fitness Dashboard
        </h1>

        <p className="text-gray-400 mt-1">
          Track workouts, analyze progress and generate AI plans
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <button
          onClick={getAiAdvice}
          disabled={loadingAiCoach}
          className={`
            w-full sm:w-auto px-4 py-3 rounded-lg font-medium transition-all
            ${
              loadingAiCoach
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }
          `}
        >
          {loadingAiCoach
            ? "Analyzing..."
            : "🤖 AI Coach"}
        </button>

        <button
          onClick={() => setPlanModalOpen(true)}
          className="
            bg-green-600
            hover:bg-green-700
             w-full sm:w-auto px-4 py-3 rounded-lg font-medium transition-all
          "
        >
          🏋 Generate Plan
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="
            bg-blue-600
            hover:bg-blue-700
             w-full sm:w-auto px-4 py-3 rounded-lg font-medium transition-all
          "
        >
          + Add Workout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;