import React, { useState } from 'react';
import './Loginform.css';

const Loginform = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const managerCredentials = { username: 'manager', password: 'manager123' };

    if (username === managerCredentials.username && password === managerCredentials.password) {
      setUser({ username, role: 'Manager' });
    } else {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        setUser(user);
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <a href="signup">Signup</a>
    </div>
  );
};

export default Loginform;
