import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const WeeklyAreaChart = ({ data }) => {
  return (
    <div className="bg-slate-800 w-full p-3 md:p-5 rounded-xl border border-slate-700">
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-5">
        Weekly Activity
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="workoutGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#3B82F6"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#3B82F6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            width={30}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="workouts"
            stroke="#3B82F6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#workoutGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyAreaChart;