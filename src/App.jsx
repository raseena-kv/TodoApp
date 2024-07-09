import React, { useState, useEffect } from 'react';
import './App.css';

const TodoApp = ({ user }) => {
  const [items, setItems] = useState([]);
  const [txtContent, setTxtContent] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");
  const [assignee, setAssignee] = useState("Employee 1");
  const [sort, setSort] = useState("addedTime");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('tasks')) || [];
    setItems(storedItems);
  }, []);

  const txtChange = (e) => {
    setTxtContent(e.target.value);
  };

  const priorityChange = (e) => {
    setPriority(e.target.value);
  };

  const deadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const assigneeChange = (e) => {
    setAssignee(e.target.value);
  };

  const addItem = () => {
    if (txtContent.trim() === "") return;
    const newItem = { 
      content: txtContent, 
      priority, 
      addedTime: new Date().toLocaleString(),
      deadline: deadline ? new Date(deadline).toLocaleString() : "No deadline",
      assignee,
      status: 'pending'
    };
    const updatedItems = items.concat(newItem);
    setItems(updatedItems);
    localStorage.setItem('tasks', JSON.stringify(updatedItems));
    setTxtContent("");
    setPriority("low");
    setDeadline("");
    setAssignee("Employee 1");
  };

  const updateStatus = (index) => {
    const updatedItems = items.map((item, idx) => 
      idx === index ? { ...item, status: item.status === 'pending' ? 'done' : 'pending' } : item
    );
    setItems(updatedItems);
    localStorage.setItem('tasks', JSON.stringify(updatedItems));
  };

  const sorted = (items) => {
    return items.sort((a, b) => {
      if (sort === "addedTime") {
        return new Date(a.addedTime) - new Date(b.addedTime);
      } else if (sort === "deadline") {
        const deadlineA = a.deadline === "No deadline" ? Infinity : new Date(a.deadline);
        const deadlineB = b.deadline === "No deadline" ? Infinity : new Date(b.deadline);
        return deadlineA - deadlineB;
      } else if (sort === "priority") {
        const priorities = ["urgent", "medium", "low"];
        return priorities.indexOf(a.priority) - priorities.indexOf(b.priority);
      }
      return 0;
    });
  };

  const filteredItems = user.role === 'Manager' ? items : items.filter(item => item.assignee === user.role);
  const sortedItems = sorted([...filteredItems]);

  return (
    <div className="todo-container">
      <div className="sorting">
        <p style={{ textAlign: 'center', paddingBottom: '0px' }}>Sort by:</p>
        <select style={{ height: '30px' }} onChange={(e) => setSort(e.target.value)}>
          <option value="addedTime">Added Date</option>
          <option value="priority">Priority</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>
      
      <h1>TodoApp</h1>
      {user.role === 'Manager' && (
        <div className="box">
          <input 
            type="text" 
            className='input-section' 
            onChange={txtChange} 
            placeholder='Enter Items...'
            value={txtContent}
          />
          <select value={priority} onChange={priorityChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="urgent">Urgent</option>
          </select>
          <input 
            type="datetime-local"
            className='reminder' 
            value={deadline}
            onChange={deadlineChange} 
          />
          <select value={assignee} onChange={assigneeChange}>
            <option value="Employee 1">Employee 1</option>
            <option value="Employee 2">Employee 2</option>
          </select>
          <button className="add" onClick={addItem}>ADD</button>
        </div>
      )}
      <ul>
        {sortedItems.map((item, index) => (
          <li key={index} >
            <div>
              <span>{item.content} ({item.priority})</span><br/>
              <small>Added on: {item.addedTime}</small><br/>
              <small>Deadline: {item.deadline}</small><br/>
              <small>Assignee: {item.assignee}</small><br/>
              <small>Status: {item.status}</small>
              {user.role !== 'Manager' && (
                <button onClick={() => updateStatus(index)}>
                  {item.status === 'pending' ? 'Mark as done' : 'Mark as pending'}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
