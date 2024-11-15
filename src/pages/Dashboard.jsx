import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/dashboard/users"
          className="flex flex-col items-center justify-center bg-blue-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-center">Manage user roles, permissions, and profiles.</p>
        </Link>
        <Link
          to="/dashboard/content"
          className="flex flex-col items-center justify-center bg-green-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <h2 className="text-xl font-semibold mb-2">Content Management</h2>
          <p className="text-center">Create, edit, and manage your content effectively.</p>
        </Link>
        <Link
          to="/dashboard/subscriptions"
          className="flex flex-col items-center justify-center bg-yellow-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <h2 className="text-xl font-semibold mb-2">Subscription Management</h2>
          <p className="text-center">Oversee user subscriptions and billing.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;