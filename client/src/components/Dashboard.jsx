import { useEffect, useState } from 'react';

const healthTips = [
  {
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water a day to stay healthy.',
  },
  {
    title: 'Exercise Regularly',
    description: 'Exercise for at least 30 minutes a day to stay fit and healthy.',
  },
  {
    title: 'Eat Healthy',
    description: 'Eat a balanced diet that includes fruits, vegetables, and whole grains.',
  },
  {
    title: 'Get Enough Sleep',
    description: 'Get at least 7-8 hours of sleep a night to stay healthy.',
  },
  {
    title: 'Manage Stress',
    description: 'Find healthy ways to manage stress, such as meditation or deep breathing.',
  },
];

const DashboardPage = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [userData, setUserData] = useState({});
  const [mother, setMother] = useState('Mother');
  const [child, setChild] = useState('Child');

  const handleNextTip = () => {
    setCurrentTip((currentTip + 1) % healthTips.length);
  };

  const getUserData = async () => {
    const email = window.localStorage.getItem('email');
    try {
      const response = await fetch(`http://localhost:3000/api/user/getuser?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    } catch (err) {
      console.log('Error fetching user data:', err);
    }
  };

  const fetchMotherData = async (motherId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/mother/getMother/${motherId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch mother data');
      }
      const motherInfo = await response.json();
      setMother(motherInfo.firstName);  // Assuming you need to set the full mother data, not just the ID
    } catch (err) {
      console.log('Error fetching mother data:', err);
    }
  };

  const getChildData = async (childId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/infant/getChild/${childId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch child data');
      }
      const childInfo = await response.json();
      setChild(childInfo.name)
    } catch (err) {
      console.log('Error fetching child data:', err);
    }
  };



  const fetchData = async () => {
    const newUserData = await getUserData();
    if (!newUserData) {
      return;
    }

    setUserData(newUserData);  // Update userData state

    if (newUserData.mothers && newUserData.mothers[0]) {
      await fetchMotherData(newUserData.mothers[0]);  // Fetch and set mother data
    }

    if (newUserData.infants && newUserData.infants[0]) {
      await getChildData(newUserData.infants[0]) 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 h-screen w-screen flex flex-col justify-between">
      <h2 className="text-4xl font-bold text-indigo-900 text-center m-8">Hello, {userData.name ? userData.name : ''}</h2>
      <main className="flex-grow flex justify-between items-start px-10 py-6 pt-10 gap-6">
        {/* More Resources Section */}
        <section className="w-1/2 max-w-6xl mb-6 bg-gradient-to-t from-gray-50 to-gray-100 h-64 rounded-lg shadow-lg p-6 px-2">
          <h2 className="text-4xl font-bold text-indigo-900 text-center mb-8">Get Started</h2>
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={() => {
                if(mother === 'Mother'){
                  window.location.href = '/tracemother'
                }else{
                  window.location.href = '/trackmother'
                }
              }}
              className="w-3/4 sm:w-1/2 bg-indigo-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Trace {mother} 
            </button>
            <button
              onClick={() => {
                if(child === 'Child'){
                  window.location.href = '/trackchild'
                }else{
                  window.location.href = '/tracechild'
                }
                }
              }
              className="w-3/4 sm:w-1/2 bg-indigo-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Trace {child} 
            </button>
          </div>
        </section>

        {/* Health Tips Section */}
        <section className="w-1/2 max-w-6xl mb-6 bg-gradient-to-t from-gray-50 to-gray-100 h-64 rounded-lg shadow-lg p-6">
          <div className="bg-transparent p-6 rounded-lg text-center mb-6">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4">{healthTips[currentTip].title}</h3>
            <p className="text-lg text-gray-600 mb-4">{healthTips[currentTip].description}</p>
            <button
              onClick={handleNextTip}
              className="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-full "
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
