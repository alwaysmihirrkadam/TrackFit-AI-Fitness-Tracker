import Workout from "../models/workoutSchema.js";
import model from "../services/geminiService.js";

// AI Coach Analysis
export const getAiCoach = async (req, res, next) => {
  try {
    const workouts = await Workout.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    if (!workouts.length) {
      return res.status(404).json({
        success: false,
        message: "No workouts found",
      });
    }

    const workoutData = workouts.map((w) => ({
      category: w.category,
      workoutName: w.workoutName,
      sets: w.sets,
      reps: w.reps,
      weight: w.weight,
      duration: w.duration,
      caloriesBurned: w.caloriesBurned,
    }));

    const prompt = `
Analyze this workout history and return ONLY valid JSON.

Workout Data:
${JSON.stringify(workoutData)}

Return format:

{
  "summary": "short summary",
  "consistencyScore": 8,
  "strongestCategory": "Chest",
  "weakestCategory": "Legs",
  "recommendations": [
    "recommendation 1",
    "recommendation 2",
    "recommendation 3"
  ],
  "motivation": "motivational message"
}

Return JSON only.
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const aiData = JSON.parse(text);

    return res.status(200).json({
      success: true,
      aiData,
    });
  } catch (error) {
    next(error);
  }
};

// AI Workout Plan Generator
export const generateWorkoutPlan = async (req, res, next) => {
  try {
    const {
      goal = "Muscle Gain",
      experience = "Beginner",
      daysPerWeek = 4,
    } = req.body;

    const prompt = `
Create a ${daysPerWeek}-day workout plan.

Goal: ${goal}
Experience: ${experience}

Return ONLY valid JSON.

{
  "Monday": {
    "focus": "Upper Body",
    "exercises": [
      {
        "name": "Bench Press",
        "sets": 3,
        "reps": "8-12"
      },
      {
        "name": "Dumbbell Row",
        "sets": 3,
        "reps": "8-12"
      }
    ]
  },
  "Tuesday": {
    "focus": "Lower Body",
    "exercises": [
      {
        "name": "Squat",
        "sets": 3,
        "reps": "10-12"
      }
    ]
  }
}

Rules:
- Return only JSON
- No markdown
- No explanations
- Every workout day must contain:
  - focus
  - exercises array
- Each exercise must contain:
  - name
  - sets
  - reps
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const plan = JSON.parse(text);

    return res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};