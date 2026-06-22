import mongoose from "mongoose";

const workoutPlanProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    day: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    planWeek: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WorkoutPlanProgress = mongoose.model(
  "WorkoutPlanProgress",
  workoutPlanProgressSchema
);

export default WorkoutPlanProgress;