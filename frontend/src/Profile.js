import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOnlineUsers();
  }, []);

  const fetchOnlineUsers = async () => {
    try {
      // const response = await fetch('http://127.0.0.1:5000/profile');
      const response = await fetch('https://a2-container3-fb74xf24fq-uc.a.run.app/profile');
      const data = await response.json();
      setOnlineUsers(data.onlineusers);
    } catch (error) {
      console.log('Error fetching online users:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://a2-container2-fb74xf24fq-uc.a.run.app/logout', { email });
      console.log(response.data);
      // Perform further actions after logout, such as clearing session or redirecting
      // For example, clear session and redirect to login page
      navigate('/login');
      // history.push('/login');
    } catch (error) {
      console.error(error);
      // Handle error response from the backend
    }
  };

  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center mt-4 mb-5">
        <p>{email}!</p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <h1 className="text-center mb-4">Welcome!</h1>
      <div className="d-flex justify-content-center">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="card-title text-center">Online Users</h4>
            {onlineUsers.length === 0 ? (
              <p className="text-center">No users online</p>
            ) : (
              <ul className="list-group list-group-flush">
                {onlineUsers.map((email) => (
                  <li className="list-group-item" key={email}>
                    {email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;
