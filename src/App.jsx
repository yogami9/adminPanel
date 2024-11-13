import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement'; // Import UserManagement
import ContentManagement from './pages/ContentManagement'; // Import ContentManagement
import SubscriptionManagement from './pages/SubscriptionManagement'; // Import SubscriptionManagement

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UserManagement />} />
        <Route path="/dashboard/content" element={<ContentManagement />} />
        <Route path="/dashboard/subscriptions" element={<SubscriptionManagement />} />
      </Routes>
    </Router>
  );
}

export default App;