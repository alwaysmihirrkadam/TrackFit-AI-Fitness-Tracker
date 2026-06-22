import express from 'express';
import Workout from '../models/workoutSchema.js';

const calculateEstimatedCalories = (workout) => {
    const duration = Number(workout.duration) || 0;
    const weight = Number(workout.weight) || 0;
    const sets = Number(workout.sets) || 0;
    const reps = Number(workout.reps) || 0;

    if (!duration) return 0; // Prevent dividing by zero

    // Base MET for light-to-moderate resistance training
    let baseMet = 4.0;

    // Calculate total volume lifted
    const totalVolume = sets * reps * weight;

    // Scale intensity slightly based on volume per minute
    const volumePerMinute = totalVolume / duration;
    if (volumePerMinute > 150) baseMet = 6.0;      // Very high intensity
    else if (volumePerMinute > 100) baseMet = 5.5; // High intensity

    // Default average weight used if profile weight tracker isn't set up yet
    const userWeightKg = 75;

    const calories = (baseMet * 3.5 * userWeightKg / 200) * duration;
    return Math.round(calories);
};

export const getWorkout = async (req, res, next) => {
    try {
        const workouts = await Workout.find({
            user: req.user.id,
        })
            .select("-__v")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: workouts.length,
            workouts,
        });
    } catch (error) {
        next(error)
    }
}
export const addWorkout = async (req, res, next) => {
    try {
        const {
            duration,
            weight,
            sets,
            reps,
        } = req.body;

        const caloriesBurned =
            calculateEstimatedCalories({
                duration,
                weight,
                sets,
                reps,
            });

        const workout = await Workout.create({
            user: req.user.id,
            category: req.body.category,
            workoutName: req.body.workoutName,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight,
            duration: req.body.duration,
            caloriesBurned,
        });

        res.status(201).json({
            success: true,
            message: "Workout Added",
            workout,
        });

    } catch (error) {
        next(error);
    }
};
export const updateWorkout = async (req, res, next) => {
    try {
        const workout = await Workout.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true, runValidators: true })
        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found",
            });
        }
        return res.status(201).json({ message: "Workout updated" })
    } catch (error) {
        next(error)
    }
}
export const deleteWorkout = async (
    req,
    res,
    next
) => {
    try {
        const workout =
            await Workout.findOneAndDelete({
                _id: req.params.id,
                user: req.user.id,
            });

        if (!workout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Workout deleted",
        });

    } catch (error) {
        next(error);
    }
};