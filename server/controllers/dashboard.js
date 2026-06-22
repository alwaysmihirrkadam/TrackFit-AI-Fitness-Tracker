import Workout from "../models/workoutSchema.js";

export const getDashboard = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.id,
    });

    const totalWorkouts = workouts.length;

    const totalCaloriesBurned = workouts.reduce(
      (acc, workout) => acc + workout.caloriesBurned,
      0
    );

    const averageCaloriesBurned =
      totalWorkouts > 0
        ? Math.round(totalCaloriesBurned / totalWorkouts)
        : 0;

    const categoryStats = {};

    workouts.forEach((workout) => {
      categoryStats[workout.category] =
        (categoryStats[workout.category] || 0) + 1;
    });

    res.status(200).json({
      success: true,

      totalWorkouts,

      totalCaloriesBurned,

      averageCaloriesBurned,

      categoryStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};