import React, { useEffect, useState } from "react";
import WorkoutPlanCard from "./WorkoutPlanCard";
import axios from "axios";
import CompleteWorkoutModal from "./CompleteWorkoutModal";
import WorkoutDetailsModal from "./WorkoutDetailsModal";
import { toast } from "react-toastify";

const WorkoutPlanSection = ({ plan, planForm, token, refreshDashboard, refreshWeeklyData, refreshRecentWorkout, }) => {
    if (!plan) return null;

    const [progress, setProgress] = useState([]);
    const [completeModal, setCompleteModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [showWorkoutModal, setShowWorkoutModal] = useState(false);

    const refreshAll = () => {
        refreshDashboard();
        refreshWeeklyData();
        refreshRecentWorkout();
    };

    const viewWorkout = (day, workout) => {
        setSelectedWorkout({
            day,
            workout,
        });

        setShowWorkoutModal(true);
    };

    const getProgress = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/api/workouts/progress",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProgress(res.data.progress);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to get progress"
            );
        }
    };

    const saveWorkout = async () => {
        try {
            const exerciseCount = selectedWorkout.workout
                .split(/\d+\./)
                .filter(Boolean).length;

            const duration = exerciseCount * 10;

            await axios.post(
                "http://localhost:3000/api/workouts/addWorkout",
                {
                    workoutName: selectedWorkout.day,
                    category: "AI Plan",
                    sets: 3,
                    reps: 12,
                    weight: 20,
                    duration,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await axios.post(
                "http://localhost:3000/api/workouts/complete-day",
                {
                    day: selectedWorkout.day,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await getProgress();
            
            refreshAll()
            toast.success("Workout Added 💪");

            setCompleteModal(false);
            setShowWorkoutModal(false);
            setSelectedWorkout(null);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to add workout"
            );
        }
    };

    useEffect(() => {
        getProgress()
    }, [])



    const markDayComplete = (day, workout) => {
        setSelectedWorkout({
            day,
            workout
        });

        setCompleteModal(true);
    };




    return (
        <div className="my-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">
                    🏋️ AI Workout Plan
                </h2>

                <span className="bg-green-600 px-4 py-2 rounded-full text-sm font-semibold">
                    {Object.keys(plan).length} Days
                </span>
            </div>

            {/* Goal Banner */}
            <div className="bg-linear-to-r from-green-600 to-emerald-700 rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-2">
                    Your AI Training Program
                </h3>

                <p className="text-green-100">
                    Goal: {planForm.goal}
                    {" • "}
                    Experience: {planForm.experience}
                    {" • "}
                    Training Days: {planForm.daysPerWeek}
                </p>
            </div>

            {/* Workout Cards */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(plan).map(([day, workout]) => (
                    <WorkoutPlanCard
                        key={day}
                        day={day}
                        workout={workout}
                        progress={progress}
                        markDayComplete={markDayComplete}
                        viewWorkout={viewWorkout}
                    />
                ))}
            </div>

            <WorkoutDetailsModal
                open={showWorkoutModal}
                workout={selectedWorkout}
                onClose={() => setShowWorkoutModal(false)}
                onComplete={() => {
                    setShowWorkoutModal(false);
                    setCompleteModal(true);
                }}
            />

            <CompleteWorkoutModal
                open={completeModal}
                workout={selectedWorkout}
                onClose={() => setCompleteModal(false)}
                onSave={saveWorkout}
            />
        </div>
    );
};

export default WorkoutPlanSection;