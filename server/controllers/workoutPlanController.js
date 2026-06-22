import WorkoutPlanProgress from "../models/workoutPlanProgress.js";

export const completeWorkoutDay = async (req, res) => {
  try {
    const { day } = req.body;

    const currentWeek = new Date().toISOString().slice(0, 10);

    const progress = await WorkoutPlanProgress.findOneAndUpdate(
      {
        user: req.user.id,
        day,
        planWeek: currentWeek,
      },
      {
        completed: true,
        completedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkoutProgress = async (req, res) => {
  try {
    const currentWeek = new Date().toISOString().slice(0, 10);

    const progress = await WorkoutPlanProgress.find({
      user: req.user.id,
      planWeek: currentWeek,
    });

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};