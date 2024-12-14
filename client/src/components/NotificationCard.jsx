import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react'; // Ensure to import the AlertCircle icon

const NotificationCard = ({ nextStage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg"
    >
      <div className="flex items-center">
        <AlertCircle className="text-yellow-500 mr-2" />
        <h3 className="text-lg font-semibold text-yellow-700">Upcoming Vaccination</h3>
      </div>
      {nextStage ? (
        <p className="mt-2 text-yellow-600">
          Prepare for the next set of vaccines at <strong>{nextStage.age}</strong>. Don't forget to schedule your appointment!
        </p>
      ) : (
        <p className="mt-2 text-yellow-600">
          Congratulations! Your child has completed all required vaccinations. Stay healthy and continue with regular checkups!
        </p>
      )}
    </motion.div>
  );
};

export default NotificationCard;

