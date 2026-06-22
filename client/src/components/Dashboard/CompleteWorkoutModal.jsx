import React from "react";

const CompleteWorkoutModal = ({
  open,
  workout,
  onClose,
  onSave,
}) => {
  if (!open || !workout) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-4 md:p-6 rounded-2xl w-full max-w-md mx-4">

        <h2 className="text-xl font-bold mb-4">
          Complete Workout
        </h2>

        <p className="text-gray-300">
          Did you complete all exercises for
          <span className="font-bold text-green-400 ml-2">
            {workout.day}
          </span>
          ?
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={onSave}
            className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg"
          >
            Yes
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default CompleteWorkoutModal;