import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    fetchOnlineUsers();
  }, []);

  const fetchOnlineUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/onlineusers');
      const data = await response.json();
      setOnlineUsers(data.onlineusers);
    } catch (error) {
      console.log('Error fetching online users:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Online Users</h1>
      {onlineUsers.length === 0 ? (
        <p>No users online</p>
      ) : (
        <ul className="list-group">
          {onlineUsers.map((email) => (
            <li className="list-group-item" key={email}>
              {email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OnlineUsers;
