import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/dashboard/users" className="bg-white p-4 rounded shadow">User Management</Link>
        <Link to="/dashboard/content" className="bg-white p-4 rounded shadow">Content Management</Link>
        <Link to="/dashboard/subscriptions" className="bg-white p-4 rounded shadow">Subscription Management</Link>
      </div>
    </div>
  );
};

export default Dashboard;