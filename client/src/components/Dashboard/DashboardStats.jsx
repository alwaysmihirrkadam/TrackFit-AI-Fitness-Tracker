import React from "react";

const DashboardStats = ({ dashboard }) => {
  const stats = [
    {
      title: "Total Workouts",
      value: dashboard?.totalWorkouts || 0,
      icon: "💪",
    },
    {
      title: "Calories Burned",
      value: dashboard?.totalCaloriesBurned || 0,
      icon: "🔥",
    },
    {
      title: "Average Calories",
      value: dashboard?.averageCaloriesBurned || 0,
      icon: "📊",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className=" bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-gray-400 text-sm">
                {item.title}
              </h2>

              <p className="text-2xl md:text-4xl font-bold mt-3">
                {item.value}
              </p>
            </div>

            <div className="text-3xl md:text-4xl">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;