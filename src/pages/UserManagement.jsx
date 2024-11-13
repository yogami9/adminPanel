import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchUsers = async () => {
    const response = await axios.get('https://motivata.onrender.com/api/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    // Logic to create or update user
    // Example:
    const newUser = { username, email, password };
    await axios.post('https://motivata.onrender.com/api/users', newUser, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

    // Clear form and refresh users
    setUsername('');
    setEmail('');
    setPassword('');
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`https://motivata.onrender.com/api/users/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    fetchUsers();
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleUserSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.email} <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;