import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TraceMother = () => {
  const navigate = useNavigate();
  // State to hold the form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    address: '',
    dateOfBirth: '',
    childrenNo: 0,
    pregnanciesNo: 0,
    deliveryDate: '',
    fetusCount: 1,
  });

  // State to track the current section
  const [currentSection, setCurrentSection] = useState(1);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Handle section navigation
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Step 1: Create a new mother
    const createMotherResponse = await fetch('http://localhost:3000/api/mother/createMother', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const motherData = await createMotherResponse.json();

    if (!createMotherResponse.ok) {
      throw new Error(motherData.message || 'Failed to create mother');
    }

    console.log('Mother created successfully:', motherData);

    // Step 2: Get user email from localStorage
    const email = window.localStorage.getItem('email');
    if (!email) {
      throw new Error('User email not found in local storage');
    }

    const motherId = motherData._id;

    // Step 3: Link the mother to the user
    const updateUserResponse = await fetch('http://localhost:3000/api/user/addmother', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, motherId }),
    });

    const updateUserData = await updateUserResponse.json();

    if (!updateUserResponse.ok) {
      throw new Error(updateUserData.message || 'Failed to link mother to user');
    }
    console.log('User updated successfully:', updateUserData);
    
  
    navigate('/dashboard');
  } catch (error) {
    console.error('Error during process:', error.message || error);
    alert(error.message || 'An error occurred. Please try again later.');
  }
};
  const handleNext = () => setCurrentSection((prev) => prev + 1);
  const handlePrevious = () => setCurrentSection((prev) => prev - 1);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 h-screen w-screen flex flex-col items-center animate__fadeIn mb-12">
      <main className="flex-grow flex justify-center items-center w-full">
        <form className="w-full max-w-4xl bg-white my-4 p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-indigo-900 text-center mb-8">Trace Mother Information</h2>

          {currentSection === 1 && (
            <div>
              {['firstName', 'lastName', 'email', 'phoneNo', 'address'].map((field) => (
                <div key={field} className="mb-6">
                  <label htmlFor={field} className="text-lg font-medium text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
              >
                Next
              </button>
            </div>
          )}

          {currentSection === 2 && (
            <div>
              {[
                { name: 'dateOfBirth', type: 'date' },
                { name: 'childrenNo', type: 'number' },
                { name: 'pregnanciesNo', type: 'number' },
              ].map((field) => (
                <div key={field.name} className="mb-6">
                  <label htmlFor={field.name} className="text-lg font-medium text-gray-700 capitalize">
                    {field.name.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="w-24 sm:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-2 rounded-lg"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-24 sm:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentSection === 3 && (
            <div>
              {[
                { name: 'deliveryDate', type: 'date' },
                { name: 'fetusCount', type: 'number' },
              ].map((field) => (
                <div key={field.name} className="mb-6">
                  <label htmlFor={field.name} className="text-lg font-medium text-gray-700 capitalize">
                    {field.name.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="w-24 sm:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-2 rounded-lg"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="w-24 sm:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-2 rounded-lg"
                >
                  Submit Information
                </button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default TraceMother;
