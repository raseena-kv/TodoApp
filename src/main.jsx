
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Loginform from './Loginform.jsx';
import Signup from './Signup.jsx';
import TodoApp from './App.jsx';

const MainApp = () => {
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Loginform setUser={setUser} />} />
          <Route path="signup" element={<Signup setUser={setUser} />} />
        </Routes>
      </Router>
    );
  }

  return <TodoApp user={user} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
);
