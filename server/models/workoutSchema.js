import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    category: {
        type: String,
        required: true,
    },

    workoutName: {
        type: String,
        required: true,
    },

    sets: {
        type: Number,
        default: 0,
    },

    reps: {
        type: Number,
        default: 0,
    },
    
    weight: {
        type: Number,
        default: 20,
    },

    duration: {
        type: Number,
        required: true,
    },

    caloriesBurned: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;