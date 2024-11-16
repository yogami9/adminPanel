import React, { useState } from 'react';

/*This line imports the React library and specifically the useState Hook, which allows functional components to manage state. useState is a React Hook that adds state to functional components. */
import axios from 'axios';
import { IoPerson, IoLockClosed } from 'react-icons/io5'; // Icons for user and password

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    setIsLoading(true); // Show loading state
    try {
      const response = await axios.post('https://motivata.onrender.com/api/auth/admin/login', { username, password });
      // Save token in localStorage or context
      localStorage.setItem('token', response.data.token);
      // Redirect to the dashboard or another page
      window.location.href = '/dashboard';
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        setError(err.response.data.message || 'Invalid credentials.');
      } else {
        // Network error or other issues
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <div className="flex items-center border border-gray-300 rounded">
            <IoPerson className="text-gray-500 ml-2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-0 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="flex items-center border border-gray-300 rounded">
            <IoLockClosed className="text-gray-500 ml-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-0 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
        </div>
        <button
          className={`w-full bg-blue-600 text-white p-2 rounded transition duration-200 ${
            isLoading ? 'bg-blue-400' : 'hover:bg-blue-700'
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;