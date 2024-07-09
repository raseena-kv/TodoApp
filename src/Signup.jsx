import React, { useState } from 'react';
import './Signup.css'; 

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee 1');

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { username, password, role };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    setUser(newUser);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Employee 1">Employee 1</option>
          <option value="Employee 2">Employee 2</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
