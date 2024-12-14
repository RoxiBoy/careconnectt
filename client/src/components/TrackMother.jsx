import { useState, useEffect } from 'react';
import { ProgressBar } from './ProgressBar';
import { StageInfo } from './StageInfo';
import { fetchUserData, fetchMotherData } from './dataService';

const TrackMother = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentStage, setCurrentStage] = useState(null);
  const [motherData, setMotherData] = useState({});

  useEffect(() => {
    const initializeData = async () => {
      try {
        const userData = await fetchUserData();
        const motherId = userData.mothers[0];
        const motherInfo = await fetchMotherData(motherId);
        setMotherData(motherInfo);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };
    initializeData();
  }, []);

  useEffect(() => {
    if (motherData.deliveryDate) {
      const weekProgress = calculateCurrentWeek(motherData.deliveryDate);
      setCurrentWeek(weekProgress);
      setCurrentStage(getCurrentStage(weekProgress));
    }
  }, [motherData]);

  const calculateCurrentWeek = (deliveryDate) => {
    const totalWeeks = 40; // assuming full pregnancy duration is 40 weeks
    const today = new Date();
    const startOfPregnancy = new Date(deliveryDate);
    startOfPregnancy.setDate(startOfPregnancy.getDate() - totalWeeks * 7); // Adjust start date

    const weekDifference = Math.floor((today - startOfPregnancy) / (1000 * 60 * 60 * 24 * 7));
    return Math.min(Math.max(weekDifference, 0), totalWeeks); // Clamp between 0 and 40
  };

  const getCurrentStage = (weekProgress) => {
    const stages = [
      { name: '1st Trimester', weeks: 13, color: 'pink' },
      { name: '2nd Trimester', weeks: 13, color: 'purple' },
      { name: '3rd Trimester', weeks: 13, color: 'blue' },
      { name: 'Labour', weeks: 1, color: 'red' },
      { name: 'Postpartum', weeks: 6, color: 'green' },
    ];

    let weekCount = 0;
    for (const stage of stages) {
      weekCount += stage.weeks;
      if (weekProgress <= weekCount) {
        return stage;
      }
    }
    return stages[stages.length - 1]; // Default to last stage
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 p-6 bg-cyan-100 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Pregnancy Journey Tracker</h1>
      <div className="mb-8 relative">
        <ProgressBar progress={currentWeek} currentStage={currentStage} />
      </div>
      <div className="mb-8">
        {currentStage && <StageInfo currentStage={currentStage} currentWeek={currentWeek} />}
      </div>
    </div>
  );
};

export default TrackMother;

