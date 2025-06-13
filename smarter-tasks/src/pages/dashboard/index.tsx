import React from 'react';

const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('userData') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/signin';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
      <p className='text-1xl font-bold text-center text-gray-800 mb-8'>Name: {user.name}</p>
      <p className='text-1xl font-bold text-center text-gray-800 mb-8'>Email: {user.email}</p>
      <button id="logout-link" onClick={handleLogout} className='text-1xl font-bold text-center text-gray-800 mb-8'>Logout</button>
    </div>
  );
}

export default Dashboard;