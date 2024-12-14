
import { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/login'; 
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error, please try again later.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border-2 border-gray-300 rounded-lg"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-3 border-2 border-gray-300 rounded-lg"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border-2 border-gray-300 rounded-lg"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border-2 border-gray-300 rounded-lg"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
