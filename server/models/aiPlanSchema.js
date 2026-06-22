import mongoose from "mongoose";

const aiPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    goal: String,
    experience: String,
    daysPerWeek: Number,

    plan: Object,

    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AIPlan", aiPlanSchema);