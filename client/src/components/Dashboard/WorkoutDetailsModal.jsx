import React from "react";

const WorkoutDetailsModal = ({
  open,
  workout,
  onClose,
  onComplete,
}) => {
  if (!open || !workout) return null;

  const exercises = String(workout.workout)
    .split(/\d+\./)
    .map((item) => item.trim())
    .filter(Boolean);

  const estimatedCalories =
    exercises.length * 50;

  const estimatedDuration =
    exercises.length * 10;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">

      <div className="bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">

          <div>
            <h2 className="text-xl md:text-3xl font-bold">
              🏋️ {workout.day}
            </h2>

            <p className="text-slate-400 mt-1">
              AI Generated Workout
            </p>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-red-600 hover:bg-red-700"
          >
            ✕
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6">
          <div className="bg-slate-800 rounded-2xl p-5 border border-orange-500/20">
            <p className="text-slate-400 text-sm">
              Estimated Calories
            </p>

            <h3 className="text-3xl font-bold text-orange-400 mt-2">
              🔥 {estimatedCalories}
            </h3>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-blue-500/20">
            <p className="text-slate-400 text-sm">
              Estimated Duration
            </p>

            <h3 className="text-3xl font-bold text-blue-400 mt-2">
              ⏱️ {estimatedDuration} min
            </h3>
          </div>

        </div>

        {/* Exercise List */}
        <div className="px-6 pb-6">

          <h3 className="text-xl font-bold mb-4">
            Exercises ({exercises.length})
          </h3>

          <div className="space-y-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-2xl
                  p-4
                  flex
                  gap-4
                  hover:border-blue-500
                  transition
                "
              >
                <div
                  className="
                   min-w-[40px] h-[40px] md:min-w-[50px] md:h-[50px]
                    bg-blue-600
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-lg
                  "
                >
                  {index + 1}
                </div>

                <div className="flex-1">
                  <p className="text-slate-200 leading-relaxed">
                    {exercise}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700">

          <button
            onClick={onComplete}
            className="
              w-full
              bg-green-600
              hover:bg-green-700
              py-4
              rounded-2xl
              font-bold
              text-lg
              transition
            "
          >
            ✅ Mark Workout Completed
          </button>

        </div>

      </div>

    </div>
  );
};

export default WorkoutDetailsModal;