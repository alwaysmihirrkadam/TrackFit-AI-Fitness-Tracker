import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import WeeklyBarChart from '../components/WeeklyAreaChart';
import RecentWorkout from '../components/AllWorkout';
import WorkoutModal from '../components/WorkoutModel';
import WorkoutPlanModal from '../components/Dashboard/WorkoutPlanModal';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardStats from '../components/Dashboard/DashboardStats';
import AICoachSection from '../components/Dashboard/AICoachSection';
import WorkoutPlanSection from '../components/Dashboard/WorkoutPlanSection';
import { toast } from "react-toastify";

const Dashboard = ({ token }) => {
  const [dashboard, setDashboard] = useState(null)
  const [weeklyData, setWeeklyData] = useState([])
  const [recentWorkout, setRecentWorkout] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [loadingAiCoach, setLoadingAiCoach] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [plan, setPlan] = useState(null);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [planForm, setPlanForm] = useState({
    goal: "Muscle Gain",
    experience: "Beginner",
    daysPerWeek: 4,
  });
  const [workouts, setWorkouts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setPlanForm({
      ...planForm,
      [e.target.name]: e.target.value,
    });
  };

  const COLORS = [
    '#3b82f6', // Blue (e.g., Chest)
    '#10b981', // Emerald Green (e.g., Back)
    '#f59e0b', // Amber/Yellow (e.g., Shoulders)
    '#ef4444', // Red (e.g., Legs)
    '#8b5cf6', // Purple (e.g., Arms)
    '#ec4899', // Pink (e.g., Cardio)
    '#06b6d4'  // Cyan (Fallback/Extra)
  ];

  const handleAddNewWorkout = async () => {
    setIsModalOpen(false);

    await getDashboard();
    await getWeeklyData();
    await getWorkouts();
    await getRecentWorkout();
  };

  const getAiAdvice = async () => {
    if (loadingAiCoach) return;
    try {
      setLoadingAiCoach(true);

      const res = await axios.get(
        `${API_URL}/api/workouts/ai-coach`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAiData(res.data.aiData);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to get AI Coach data"
      );
    } finally {
      setLoadingAiCoach(false);
    }
  };

  const getDashboard = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/workouts/dashboard`, { headers: { Authorization: `Bearer ${token}`, } })
      setDashboard(res.data)
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to get dashboard data"
      );
    }
  }
  const getWeeklyData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/workouts/weekly`, { headers: { Authorization: `Bearer ${token}`, } })
      setWeeklyData(res.data.weeklyData)
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to get weekly data"
      );
    }
  }
  const getWorkouts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/workouts`, { headers: { Authorization: `Bearer ${token}`, } })
      setWorkouts(res.data.workouts)
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to get workouts"
      );
    }
  }
  const getRecentWorkout = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/workouts/recent`, { headers: { Authorization: `Bearer ${token}`, } })
      setRecentWorkout(res.data.workouts)
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to get data"
      );
    }
  }

  const chartData = dashboard?.categoryStats
    ? Object.entries(dashboard.categoryStats).map(
      ([name, value]) => ({
        name,
        value,
      })
    )
    : [];

  const getWorkoutPlan = async () => {
    if (loadingPlan) return;

    try {
      setLoadingPlan(true);

      const res = await axios.post(
        `${API_URL}/api/workouts/ai-plan`,
        planForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setPlan(res.data.plan);
        setPlanModalOpen(false);
      }
      toast.success("Workout Added 💪");
      setPlanModalOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to add workout"
      );
    } finally {
      setLoadingPlan(false);
    }
  };

  const getCurrentPlan = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/workouts/current-plan`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.plan && !res.data.expired) {
        setPlan(res.data.plan);
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to get data"
      );
    }
  };

  useEffect(() => {
    getDashboard();
    getWeeklyData();
    getWorkouts();
    getRecentWorkout();
    getCurrentPlan();
  }, []);

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-xl font-semibold animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }
  
  return (
    <div className='pt-18 z-10'>
      <div className="min-h-screen bg-slate-900 text-white p-3 md:p-6">

        <DashboardHeader
          loadingAiCoach={loadingAiCoach}
          getAiAdvice={getAiAdvice}
          setPlanModalOpen={setPlanModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        <DashboardStats dashboard={dashboard} />

        <AICoachSection aiData={aiData} />

        <h2 className="text-xl font-bold mb-5">
          Workout Categories
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 w-full items-center">
          <PieChart width={280} height={280}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
          <WeeklyBarChart data={weeklyData} />
        </div>

        {plan ? (
          <WorkoutPlanSection
            plan={plan}
            planForm={planForm}
            token={token}
            refreshDashboard={getDashboard}
            refreshWeeklyData={getWeeklyData}
            refreshRecentWorkout={getRecentWorkout}
          />
        ) : (
          <div className="bg-slate-800 rounded-3xl p-10 text-center my-8">
            <h2 className="text-2xl font-bold mb-2">
              No AI Workout Plan
            </h2>

            <p className="text-gray-400">
              Generate your first AI workout plan.
            </p>
          </div>
        )}


        <RecentWorkout data={recentWorkout} />
        <WorkoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddWorkout={handleAddNewWorkout}
        />


      </div>

      <WorkoutPlanModal
        isOpen={planModalOpen}
        onClose={() => setPlanModalOpen(false)}
        planForm={planForm}
        handleChange={handleChange}
        getWorkoutPlan={getWorkoutPlan}
        loadingPlan={loadingPlan}
      />
    </div>


  )
}

export default Dashboard