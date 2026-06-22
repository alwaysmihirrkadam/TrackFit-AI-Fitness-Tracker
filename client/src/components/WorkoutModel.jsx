// components/WorkoutModal.jsx
import axios from 'axios';
import React, { useState } from 'react';

export default function WorkoutModal({ isOpen, onClose, onAddWorkout }) {
    // Keep form state internal to the modal
    const [workoutForm, setWorkoutForm] = useState({
        workoutName: '',
        category: 'Legs',
        duration: '',
        sets: '',
        reps: '',
        weight: ''
    });
    const API_URL = import.meta.env.VITE_API_URL;

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkoutForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const workoutPayload = {
                workoutName: workoutForm.workoutName,
                category: workoutForm.category,
                duration: Number(workoutForm.duration),
                sets: Number(workoutForm.sets),
                reps: Number(workoutForm.reps),
                weight: Number(workoutForm.weight)
            };
            const res = await axios.post(`${API_URL}/api/workouts/addWorkout`, workoutPayload, { headers: { Authorization: `Bearer ${token}` } })
            onAddWorkout(res.data.workout || workoutPayload);
            toast.success("Workout Added 💪");
            setWorkoutForm({ workoutName: '', category: 'Legs', duration: '', sets: '', reps: '', weight: '' });
            onClose();
            window.location.reload();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to add workout"
            );
        }
    };
    const categories = ['Legs', 'Back', 'Bicep', 'Chest', 'Tricep', 'Shoulders', 'Cardio', 'Forearms'];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-slate-900 border border-slate-800 p-4 md:p-6 rounded-xl w-[95%] max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-white">Log New Workout</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Workout Name Input */}
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Workout Name</label>
                        <input
                            type="text"
                            name="workoutName"
                            value={workoutForm.workoutName}
                            onChange={handleInputChange}
                            placeholder="e.g., Bench Press"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setWorkoutForm(prev => ({ ...prev, category: cat }))}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${workoutForm.category === cat
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sets, Reps & Weight Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Sets</label>
                            <input
                                type="number"
                                name="sets"
                                value={workoutForm.sets}
                                onChange={handleInputChange}
                                placeholder="3"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Reps</label>
                            <input
                                type="number"
                                name="reps"
                                value={workoutForm.reps}
                                onChange={handleInputChange}
                                placeholder="15"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={workoutForm.weight}
                                onChange={handleInputChange}
                                placeholder="70"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Duration Field */}
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Duration (mins)</label>
                        <input
                            type="number"
                            name="duration"
                            value={workoutForm.duration}
                            onChange={handleInputChange}
                            placeholder="25"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                            Save Workout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}