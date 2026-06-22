import Workout from "../models/workoutSchema.js";

export const getRecentWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

