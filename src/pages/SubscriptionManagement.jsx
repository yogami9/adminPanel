import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [plan, setPlan] = useState('');
  const [amount, setAmount] = useState('');
  const [durationDays, setDurationDays] = useState('');

  const fetchSubscriptions = async () => {
    const response = await axios.get('https://motivata.onrender.com/api/subscription', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setSubscriptions(response.data);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault();
    const newSubscription = { plan, amount, durationDays: Number(durationDays) };
    
    await axios.post('https://motivata.onrender.com/api/subscription', newSubscription, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

    // Clear form and refresh subscriptions
    setPlan('');
    setAmount('');
    setDurationDays('');
    fetchSubscriptions();
  };

  const handleDeleteSubscription = async (id) => {
    await axios.delete(`https://motivata.onrender.com/api/subscription/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    fetchSubscriptions();
  };

  return (
    <div>
      <h2>Subscription Management</h2>
      <form onSubmit={handleSubscriptionSubmit}>
        <input type="text" placeholder="Plan" value={plan} onChange={(e) => setPlan(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <input type="number" placeholder="Duration (days)" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} required />
        <button type="submit">Create Subscription</button>
      </form>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub._id}>
            {sub.plan} - {sub.amount} <button onClick={() => handleDeleteSubscription(sub._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionManagement;