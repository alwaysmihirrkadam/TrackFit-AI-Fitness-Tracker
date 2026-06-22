import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const Analytics = ({ token }) => {
  const [dashboard, setDashboard] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  const getData = async () => {
    try {
      const dashboardRes = await axios.get(
        "${API_URL}/api/workouts/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const weeklyRes = await axios.get(
        `${API_URL}/api/workouts/weekly`,
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
        "Failed to get data"
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="w-16 h-16 border-[6px] border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const chartData = Object.entries(
    dashboard.categoryStats || {}
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const mostTrained =
    chartData.length > 0
      ? chartData.reduce((a, b) =>
        a.value > b.value ? a : b
      )
      : null;

  return (
    <div className="pt-24 min-h-screen bg-slate-900 text-white p-4 md:p-6">

      <h1 className="text-3xl font-bold mb-6">
        📊 Analytics
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-slate-800 rounded-2xl p-5">
          <h2 className="text-xl font-bold mb-5">
            Category Distribution
          </h2>

          <PieChart width={320} height={320}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5">
          <h2 className="text-xl font-bold mb-5">
            Performance Insights
          </h2>

          <div className="space-y-5">

            <div>
              <p className="text-gray-400">
                Average Calories
              </p>

              <p className="text-3xl font-bold text-orange-400">
                🔥 {dashboard.averageCaloriesBurned}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Most Trained Muscle Group
              </p>

              <p className="text-3xl font-bold text-blue-400">
                💪 {mostTrained?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 mb-2">
                AI Insights
              </p>

              <div className="bg-slate-700 p-4 rounded-xl">
                {mostTrained
                  ? `You train ${mostTrained.name} more than any other category. Consider balancing weaker muscle groups for better overall development.`
                  : "Not enough data available."}
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">
          Weekly Workout Trend
        </h2>
      </div>

    </div>
  );
};

export default Analytics;