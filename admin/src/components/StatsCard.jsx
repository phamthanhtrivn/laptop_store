import React from "react";

const StatsCard = ({ stat }) => {
  return (
    <div
      className="relative overflow-hidden transition-all duration-300 transform border border-gray-100 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
    >
      {/* Card Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
      ></div>

      <div className="relative p-6">
        {/* Icon */}
        <div
          className={`${stat.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium tracking-wide text-gray-600 uppercase">
            {stat.title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {stat.value}
            </span>
            {stat.unit && <span className="text-sm text-gray-500">{stat.unit}</span>}
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute w-3 h-3 transition-colors duration-300 bg-gray-200 rounded-full top-4 right-4 group-hover:bg-gray-300"></div>
      </div>
    </div>
  );
};

export default StatsCard;