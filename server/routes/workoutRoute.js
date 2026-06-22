import express from 'express'
import { addWorkout, deleteWorkout, getWorkout, updateWorkout } from '../controllers/workoutController.js'
import auth from '../middleware/auth.js'
import { getDashboard } from '../controllers/dashboard.js';
import { getWeeklyStats } from '../controllers/weeklyStats.js';
import { getRecentWorkouts } from '../controllers/recentWorkout.js';
import { getAiCoach } from '../controllers/aiController.js';
import { generateWorkoutPlan, getCurrentPlan } from '../controllers/planController.js';
import { completeWorkoutDay, getWorkoutProgress } from '../controllers/workoutPlanController.js';

const router = express.Router()

router.get("/dashboard", auth, getDashboard);
router.get("/weekly", auth, getWeeklyStats);
router.get("/recent", auth, getRecentWorkouts);

router.get('/', auth, getWorkout)
router.post('/addWorkout', auth, addWorkout)
router.put('/:id', auth, updateWorkout)
router.delete('/:id', auth, deleteWorkout)

router.get("/ai-coach", auth, getAiCoach);
router.post("/ai-plan", auth, generateWorkoutPlan);
router.get( "/current-plan", auth, getCurrentPlan);

router.post( "/complete-day", auth, completeWorkoutDay);
router.get( "/progress", auth, getWorkoutProgress);


export default router