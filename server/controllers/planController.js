import AIPlan from "../models/aiPlanSchema.js";
import model from "../services/geminiService.js";

export const generateWorkoutPlan = async (req, res, next) => {
  try {
    const { goal, experience, daysPerWeek } = req.body;

    const prompt = `
You are a professional fitness coach.

Create a weekly workout plan.

Goal: ${goal}
Experience: ${experience}
Days Per Week: ${daysPerWeek}

Return ONLY valid JSON.

{
  "plan": {
    "Monday": "",
    "Tuesday": "",
    "Wednesday": "",
    "Thursday": "",
    "Friday": "",
    "Saturday": "",
    "Sunday": ""
  }
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({
        success: false,
        message: "Gemini returned invalid JSON",
      });
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    let existingPlan = await AIPlan.findOne({
      user: req.user.id,
    });

    if (existingPlan) {
      existingPlan.goal = goal;
      existingPlan.experience = experience;
      existingPlan.daysPerWeek = daysPerWeek;
      existingPlan.plan = parsedData.plan;
      existingPlan.generatedAt = new Date();

      await existingPlan.save();
    } else {
      await AIPlan.create({
        user: req.user.id,
        goal,
        experience,
        daysPerWeek,
        plan: parsedData.plan,
      });
    }

    res.status(200).json({
      success: true,
      plan: parsedData.plan,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getCurrentPlan = async (req, res, next) => {
  try {
    const existingPlan = await AIPlan.findOne({
      user: req.user.id,
    });

    if (!existingPlan) {
      return res.status(200).json({
        success: true,
        plan: null,
        expired: true,
      });
    }

    const daysPassed =
      (Date.now() - existingPlan.generatedAt.getTime()) /
      (1000 * 60 * 60 * 24);

    if (daysPassed >= 7) {
      await AIPlan.deleteOne({
        _id: existingPlan._id,
      });

      return res.status(200).json({
        success: true,
        plan: null,
        expired: true,
      });
    }
  } catch (error) {
    next(error);
  }
};