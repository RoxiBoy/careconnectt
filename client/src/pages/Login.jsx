
import { useState } from 'react';

const Login = () => {
  // Define state to hold email and password input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // To handle any login errors
  const [loading, setLoading] = useState(false);  // For loading state during the request

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Prepare the payload
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data)
        const userEmail = data.user.email
        const phone = data.user.phone
        window.localStorage.setItem('email', userEmail)
        window.localStorage.setItem('phone', phone)
        window.location.href = '/dashboard'
      } else {
        // Handle login errors
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

