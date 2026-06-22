import React from "react";

const WorkoutPlanModal = ({
  isOpen,
  onClose,
  planForm,
  handleChange,
  getWorkoutPlan,
  loadingPlan,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">
          AI Workout Planner
        </h2>

        <div className="space-y-4">
          <select
            name="goal"
            value={planForm.goal}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 text-white"
          >
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Fat Loss">Fat Loss</option>
            <option value="Strength">Strength</option>
            <option value="Endurance">Endurance</option>
          </select>

          <select
            name="experience"
            value={planForm.experience}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 text-white"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <input
            type="number"
            min="1"
            max="7"
            name="daysPerWeek"
            value={planForm.daysPerWeek}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 text-white"
            placeholder="Days Per Week"
          />

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={getWorkoutPlan}
              disabled={loadingPlan}
              className={`flex-1 py-3 rounded-lg ${
                loadingPlan
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loadingPlan ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanModal;