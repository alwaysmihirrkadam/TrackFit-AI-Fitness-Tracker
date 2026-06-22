import React, { useState } from 'react';
import axios from 'axios';
import { HiOutlineTrash } from 'react-icons/hi2';
import { toast } from "react-toastify";

const RecentWorkout = ({ data, onDeleteWorkout }) => {
    // State to track whether we are viewing 'recent' or 'all' workouts
    const [viewMode, setViewMode] = useState('recent');
    const API_URL = import.meta.env.VITE_API_URL;

    // 1. 🔥 FIX: Reverse data copy so that the newest logged workouts are always at index 0
    const sortedData = [...data].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // 2. Determine which data to render based on the active tab
    const displayedWorkouts = viewMode === 'recent'
        ? sortedData.slice(0, 5)
        : sortedData;

    // Handle delete action
    const handleDelete = async (workoutId) => {
        if (window.confirm("Are you sure you want to delete this workout log?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`${API_URL}/api/workouts/deleteWorkout/${workoutId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Workout Deleted!!");
                if (onDeleteWorkout) {
                    onDeleteWorkout(workoutId);
                } else {
                    window.location.reload();
                }
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to delete workout"
                );
            }
        }
    };

    return (
        <div className="bg-slate-800 w-full rounded-xl p-3 md:p-6 mt-8 shadow-xl">
            {/* HEADER WITH TOGGLE TABS */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                    {viewMode === 'recent' ? 'Recent Workouts' : 'All Workouts'}
                </h2>

                {/* Tab Switcher Controls */}
                <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg text-sm border border-slate-700">
                    <button
                        type="button"
                        onClick={() => setViewMode('recent')}
                        className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${viewMode === 'recent'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Recent
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('all')}
                        className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${viewMode === 'all'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        All Logs ({data.length})
                    </button>
                </div>
            </div>

            {/* TABLE CONTAINER */}
            <div className={`overflow-x-auto w-full ${viewMode === 'all' ? 'max-h-100 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-900 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600 overflow-y-auto custom-scrollbar' : ''}`}>
                <table className="w-full min-w-[700px] text-slate-200">
                    <thead className="sticky top-0 bg-slate-800 z-10 text-slate-400 text-xs tracking-wider uppercase border-b border-slate-700">
                        <tr>
                            <th className="text-left py-3 pr-4">Workout</th>
                            <th className="text-left py-3 pr-4">Category</th>
                            <th className="text-left py-3 pr-4">Sets</th>
                            <th className="text-left py-3 pr-4">Reps</th>
                            <th className="text-left py-3 pr-4">Progress</th>
                            <th className="text-left py-3 px-6">Date</th>
                            <th className="text-center py-3 w-12">Actions</th> {/* Action Column Header */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {displayedWorkouts.map((workout) => (
                            <tr
                                key={workout._id}
                                className="border-b border-slate-700/40 hover:bg-slate-700/30 transition-colors group"
                            >
                                <td className="py-3 font-medium text-white">{workout.workoutName}</td>
                                <td className="py-3 text-slate-300">{workout.category}</td>
                                <td className="py-3 text-slate-300">{workout.sets}</td>
                                <td className="py-3 text-slate-300">{workout.reps}</td>

                                <td className="py-3 w-56">
                                    <div className="space-y-1 pr-4">
                                        <div className="flex justify-between text-xs text-slate-400">
                                            <span>{workout.caloriesBurned || 0} kcal</span>
                                            <span>
                                                {Math.round(((workout.caloriesBurned || 0) / 500) * 100)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-2 rounded-full">
                                            <div
                                                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${Math.min(((workout.caloriesBurned || 0) / 500) * 100, 100)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </td>

                                <td className="py-3 px-6 text-slate-400 text-sm">
                                    {new Date(workout.date).toLocaleDateString()}
                                </td>

                                {/* Action Delete Button Column */}
                                <td className="py-3 text-center">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(workout._id)}
                                        className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-900/40 transition-all duration-150"
                                        title="Delete Log"
                                    >
                                        <HiOutlineTrash className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* 🔥 FIX: Changed colSpan to 7 to match our new total columns */}
                        {displayedWorkouts.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-12 text-slate-500">
                                    No workouts found. Log one to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentWorkout;