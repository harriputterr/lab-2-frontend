import React, { useState } from 'react';

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const validateUsername = () => {
    if (!username) {
      return 'Username cannot be empty';
    }
    return '';
  };

  const validatePassword = () => {
    if (!password) {
      return 'Password cannot be empty';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameError = validateUsername();
    const passwordError = validatePassword();

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
    } else {
      try {
        const response = await fetch('http://localhost:3333/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok && data.uuid) {
            setToken(data.uuid);

        } else {
          setErrors({ username: '', password: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ username: '', password: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`shadow appearance-none border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic mt-2">
              {errors.username}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`shadow appearance-none border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic mt-2">
              {errors.password}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
