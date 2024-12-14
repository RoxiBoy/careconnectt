import React, { useState, useEffect } from 'react';
import VerticalProgressBar from './VerticalProgressBar';
import VaccinationInfo from './VaccinationInfo';
import NotificationCard from './NotificationCard';
import { fetchUserData, fetchInfantData } from './dataService';

const vaccinationStages = [
  { age: 'At Birth', vaccines: ['BCG', 'Hepatitis B (1st)', 'Polio (OPV, 0)'], icon: '👶', color: 'bg-blue-500' },
  { age: '6 Weeks', vaccines: ['DTP', 'IPV', 'Hib', 'Hepatitis B', 'Rotavirus', 'PCV'], icon: '🍼', color: 'bg-green-500' },
  { age: '10 Weeks', vaccines: ['DTP', 'IPV', 'Hib', 'Hepatitis B', 'Rotavirus', 'PCV'], icon: '🍼', color: 'bg-green-500' },
  { age: '14 Weeks', vaccines: ['DTP', 'IPV', 'Hib', 'Hepatitis B', 'Rotavirus', 'PCV'], icon: '🍼', color: 'bg-green-500' },
  { age: '6 Months', vaccines: ['Measles-Rubella (1st)'], icon: '👶', color: 'bg-yellow-500' },
  { age: '12 Months', vaccines: ['Measles-Rubella (2nd)', 'PCV (booster)', 'DTP (booster)'], icon: '🚶‍♂️', color: 'bg-orange-500' },
  { age: '24 Months', vaccines: ['Polio (booster)', 'Typhoid conjugate'], icon: '🧒', color: 'bg-red-500' },
  { age: '60 Months', vaccines: ['DTP (booster)'], icon: '👦', color: 'bg-purple-500' },
  { age: '120 Months', vaccines: ['HPV (for girls)'], icon: '👧', color: 'bg-pink-500' },
  { age: '168 Months', vaccines: ['Tetanus-Diphtheria (booster)'], icon: '🧑', color: 'bg-indigo-500' },
];

const TrackChild = () => {
  const [childData, setChildData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(null);
  const [nextStage, setNextStage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        if (userData && userData.infants && userData.infants.length > 0) {
          const infantId = userData.infants[0];
          const infantInfo = await fetchInfantData(infantId);
          setChildData(infantInfo);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (childData) {
      const calculateProgress = () => {
        const currentDate = new Date();
        const birthDate = new Date(childData.dateOfBirth);
        const ageInMonths = (currentDate - birthDate) / (1000 * 60 * 60 * 24 * 30.44); // More precise age in months

        let currentStageIndex = vaccinationStages.findIndex((stage, index) => {
          const nextStage = vaccinationStages[index + 1];
          const stageAge = parseAge(stage.age);
          const nextStageAge = nextStage ? parseAge(nextStage.age) : Infinity;
          return ageInMonths >= stageAge && ageInMonths < nextStageAge;
        });

        if (currentStageIndex === -1) {
          currentStageIndex = vaccinationStages.length - 1;
        }

        const progressPercentage = ((currentStageIndex + 1) / vaccinationStages.length) * 100;
        setProgress(progressPercentage);
        setCurrentStage(vaccinationStages[currentStageIndex]);
        setNextStage(vaccinationStages[currentStageIndex + 1] || null);
      };

      calculateProgress();
    }
  }, [childData]);

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

  if (!childData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-2 bg-cyan-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Vaccination Tracker</h1>
      <div className="flex">
        <div className="w-1/3">
          <VerticalProgressBar progress={progress} stages={vaccinationStages} currentStage={currentStage} />
        </div>
        <div className="w-2/3 pl-8">
          {currentStage && <VaccinationInfo currentStage={currentStage} />}
          {nextStage && <NotificationCard nextStage={nextStage} />}
        </div>
      </div>
    </div>
  );
};

export default TrackChild;


