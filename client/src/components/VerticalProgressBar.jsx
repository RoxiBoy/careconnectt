import React from 'react';
import { motion } from 'framer-motion';
import { Syringe, Calendar } from 'lucide-react';

const VerticalProgressBar = ({ progress, stages, currentStage }) => (
  <div className="relative h-[600px]">
    <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
    <motion.div
      className="absolute left-4 top-0 w-1 bg-blue-500 origin-top"
      style={{ height: `${progress}%` }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
    {stages.map((stage, index) => (
      <motion.div
        key={stage.age}
        className={`absolute left-0 flex items-center`}
        style={{ top: `${(index / (stages.length - 1)) * 100}%` }}
      >
        <div
          className={`w-8 h-8 rounded-full ${stage.color} flex items-center justify-center text-white ${
            currentStage && parseAge(stage.age) <= parseAge(currentStage.age) ? 'opacity-100' : 'opacity-50'
          }`}
        >
          {currentStage && parseAge(stage.age) <= parseAge(currentStage.age) ? (
            <Syringe size={16} />
          ) : (
            <Calendar size={16} />
          )}
        </div>
        <span className="ml-4 text-sm font-medium text-gray-700">{stage.age}</span>
      </motion.div>
    ))}
  </div>
);

const parseAge = (ageStr) => {
  if (ageStr === 'At Birth') return 0;
  const [value, unit] = ageStr.split(' ');
  const numValue = parseInt(value);
  switch (unit) {
    case 'Weeks':
      return numValue / 4; // Convert weeks to months
    case 'Months':
      return numValue;
    case 'Years':
      return numValue * 12;
    default:
      return 0;
  }
};

export default VerticalProgressBar;
