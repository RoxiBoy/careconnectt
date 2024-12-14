export const StageInfo = ({ currentStage, currentWeek }) => {
  const stageInfo = {
    '1st Trimester': {
      description: 'Your baby is developing rapidly. All major organs and systems are forming.',
      tip: 'Ensure proper folic acid intake and attend your first prenatal visit.',
    },
    '2nd Trimester': {
      description: "You might start feeling the baby move. The baby's features are becoming more defined.",
      tip: 'Consider prenatal exercises and plan your anatomy scan.',
    },
    '3rd Trimester': {
      description: 'Your baby is gaining weight and preparing for birth. You may feel more uncomfortable.',
      tip: 'Prepare your hospital bag and discuss your birth plan with your doctor.',
    },
    'Labour': {
      description: 'Your body is preparing for childbirth. Stay calm and follow your birth plan.',
      tip: 'Monitor contractions and know when to head to the hospital.',
    },
    'Postpartum': {
      description: 'Focus on recovery and bonding with your newborn. Don\'t hesitate to ask for help.',
      tip: 'Rest as much as possible and ensure you have a support system in place.',
    },
  };

  return (
    <div className={`${currentStage.color} bg-opacity-20 rounded-lg p-6`}>
      <h2 className="text-2xl font-semibold mb-2">{currentStage.name}</h2>
      <p className="text-gray-700 mb-4">Week {Math.round(currentWeek)}</p>
      <p className="text-gray-800">{stageInfo[currentStage.name].description}</p>
      <p className="mt-4 font-medium text-gray-700">Tip: {stageInfo[currentStage.name].tip}</p>
    </div>
  );
};

