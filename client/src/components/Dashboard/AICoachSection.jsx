import React from "react";

const AICoachSection = ({ aiData }) => {
  if (!aiData) return null;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-5 my-6">
        <div className="bg-slate-800 rounded-2xl p-5 border border-purple-500/30">
          <h3 className="text-purple-400 font-bold mb-2">
            📝 Summary
          </h3>

          <p className="text-gray-300">
            {aiData.summary}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 border border-green-500/30">
          <h3 className="text-green-400 font-bold mb-2">
            📈 Consistency Score
          </h3>

          <p className="text-4xl font-bold">
            {aiData.consistencyScore}/10
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 border border-blue-500/30">
          <h3 className="text-blue-400 font-bold mb-2">
            💪 Strongest Category
          </h3>

          <p className="text-xl">
            {aiData.strongestCategory}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-5 border border-red-500/30">
          <h3 className="text-red-400 font-bold mb-2">
            ⚠️ Weakest Category
          </h3>

          <p className="text-xl">
            {aiData.weakestCategory}
          </p>
        </div>
      </div>

      {aiData?.recommendations?.length > 0 && (
        <div className="bg-slate-800 rounded-2xl p-5 mb-6">
          <h3 className="text-yellow-400 font-bold mb-4">
            🎯 Recommendations
          </h3>

          <div className="space-y-3">
            {aiData.recommendations.map((item, index) => (
              <div
                key={index}
                className="bg-slate-700 p-3 rounded-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl p-5 mb-6">
        <h3 className="font-bold text-xl mb-2">
          🚀 Motivation
        </h3>

        <p>
          {aiData.motivation}
        </p>
      </div>
    </>
  );
};

export default AICoachSection;