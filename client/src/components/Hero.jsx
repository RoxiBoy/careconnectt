import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-grow flex flex-col items-center justify-start px-10 py-6 pt-10">
      <div className="text-center mb-10">
        <p className="text-4xl text-gray-600 font-bold mb-12">
          Your health, our priority. Connecting you to the best healthcare resources.
        </p>
        <div className="flex space-x-4 justify-center items-center flex-col">
          <div className="flex gap-4 my-6">
            <button
              className="bg-blue-600 w-32 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="bg-gray-300 w-32 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
