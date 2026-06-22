import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaDumbbell,
  FaFire,
  FaClock,
  FaTrash,
} from "react-icons/fa";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/workouts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorkouts(res.data.workouts);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to get workout"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this workout?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/workouts/deleteWorkout/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorkouts((prev) =>
        prev.filter((item) => item._id !== id)
      );
      toast.success("Workout Deleted!!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete workout"
      );
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white text-xl">
        Loading Workouts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 px-4 md:px-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold">
          💪 My Workouts
        </h1>

        <p className="text-slate-400 mt-2">
          Total Workouts: {workouts.length}
        </p>
      </div>

      {workouts.length === 0 ? (
        <div className="bg-slate-800 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold">
            No Workouts Found
          </h2>

          <p className="text-slate-400 mt-2">
            Start logging workouts.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {workouts
            .slice()
            .reverse()
            .map((workout) => (
              <div
                key={workout._id}
                className="
                  bg-slate-800
                  border
                  border-slate-700
                  rounded-3xl
                  p-5
                  hover:border-blue-500
                  transition-all
                  duration-300
                "
              >
                {/* Top */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">
                      {workout.workoutName}
                    </h2>

                    <p className="text-blue-400 text-sm mt-1">
                      {workout.category}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      deleteWorkout(workout._id)
                    }
                    className="
                      h-10
                      w-10
                      rounded-xl
                      bg-red-500/20
                      hover:bg-red-500
                      flex
                      items-center
                      justify-center
                      transition-all
                    "
                  >
                    <FaTrash />
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="bg-slate-700 rounded-xl p-3">
                    <p className="text-xs text-slate-400">
                      Sets
                    </p>

                    <p className="font-bold text-lg">
                      {workout.sets}
                    </p>
                  </div>

                  <div className="bg-slate-700 rounded-xl p-3">
                    <p className="text-xs text-slate-400">
                      Reps
                    </p>

                    <p className="font-bold text-lg">
                      {workout.reps}
                    </p>
                  </div>

                  <div className="bg-slate-700 rounded-xl p-3">
                    <p className="text-xs text-slate-400">
                      Weight
                    </p>

                    <p className="font-bold text-lg">
                      {workout.weight || 0}kg
                    </p>
                  </div>

                  <div className="bg-slate-700 rounded-xl p-3">
                    <p className="text-xs text-slate-400">
                      Duration
                    </p>

                    <p className="font-bold text-lg">
                      {workout.duration}m
                    </p>
                  </div>

                </div>

                {/* Footer */}
                <div className="flex justify-between mt-5 text-sm text-slate-400">

                  <div className="flex items-center gap-2">
                    <FaFire />
                    {workout.caloriesBurned || 0} kcal
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock />
                    {new Date(
                      workout.date
                    ).toLocaleDateString()}
                  </div>

                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;