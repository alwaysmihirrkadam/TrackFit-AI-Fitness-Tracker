import Workout from "../models/workoutSchema.js";

export const getWeeklyStats = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.id,
    });

    const weeklyData = [
      { day: "Mon", workouts: 0 },
      { day: "Tue", workouts: 0 },
      { day: "Wed", workouts: 0 },
      { day: "Thu", workouts: 0 },
      { day: "Fri", workouts: 0 },
      { day: "Sat", workouts: 0 },
      { day: "Sun", workouts: 0 },
    ];

    workouts.forEach((workout) => {
      const date = new Date(workout.date);

      const day = date.getDay();

      const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ];

      const dayName = days[day];

      const foundDay = weeklyData.find(
        (item) => item.day === dayName
      );

      if (foundDay) {
        foundDay.workouts += 1;
      }
    });

    res.status(200).json({
      success: true,
      weeklyData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};