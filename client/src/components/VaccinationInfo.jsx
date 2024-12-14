import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const VaccinationInfo = ({ currentStage }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={currentStage.age}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`${currentStage.color} bg-opacity-20 rounded-lg p-6`}
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <span className="mr-2">{currentStage.icon}</span>
        {currentStage.age}
      </h2>
      <h3 className="text-lg font-medium mb-2">Vaccines:</h3>
      <ul className="list-disc list-inside">
        {currentStage.vaccines.map((vaccine, index) => (
          <li key={index} className="text-gray-700">{vaccine}</li>
        ))}
      </ul>
      <div className="mt-4 text-gray-700">
        <p><strong>Tips:</strong> It’s important to stay on track with the recommended vaccination schedule to ensure your child is protected against preventable diseases. If you have any concerns, don’t hesitate to consult your healthcare provider.</p>
      </div>
    </motion.div>
  </AnimatePresence>
);

export default VaccinationInfo;

