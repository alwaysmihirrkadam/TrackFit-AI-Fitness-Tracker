import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardStats from "../components/Dashboard/DashboardStats";
import WeeklyAreaChart from "../components/WeeklyAreaChart";

const Progress = ({ token }) => {
  const [dashboard, setDashboard] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);

  const getData = async () => {
    try {
      const dashboardRes = await axios.get(
        "http://localhost:3000/api/workouts/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const weeklyRes = await axios.get(
        "http://localhost:3000/api/workouts/weekly",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(dashboardRes.data);
      setWeeklyData(weeklyRes.data.weeklyData);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to get progress data"
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const streak =
    dashboard.totalWorkouts >= 20
      ? 20
      : dashboard.totalWorkouts;

  const achievements = [
    {
      title: "First Workout",
      achieved: dashboard.totalWorkouts >= 1,
    },
    {
      title: "10 Workouts Completed",
      achieved: dashboard.totalWorkouts >= 10,
    },
    {
      title: "500 Calories Burned",
      achieved: dashboard.totalCaloriesBurned >= 500,
    },
    {
      title: "Workout Machine",
      achieved: dashboard.totalWorkouts >= 50,
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-900 text-white p-4 md:p-6">

      <h1 className="text-3xl font-bold mb-6">
        📈 Progress Tracker
      </h1>

      <DashboardStats dashboard={dashboard} />

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3">
            🔥 Current Streak
          </h2>

          <p className="text-5xl font-bold text-orange-400">
            {streak}
          </p>

          <p className="text-gray-400 mt-2">
            Consecutive workout days
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3">
            🏆 Recent Achievements
          </h2>

          <div className="space-y-3">
            {achievements.map((item) => (
              <div
                key={item.title}
                className="flex justify-between"
              >
                <span>{item.title}</span>

                <span>
                  {item.achieved ? "✅" : "❌"}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <WeeklyAreaChart data={weeklyData} />
    </div>
  );
};

export default Progress;