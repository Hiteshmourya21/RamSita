import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import adminImg from '../../img/Admin.png';
import sessionChairImg from '../../img/Session.jpg';
import authorImg from '../../img/Student.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(selectedRole){
      if (!email || !password) {
        alert('Please fill in all fields');
      }
      else{
      try{
        const role = selectedRole;
        const response = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password, role });
        console.log('Login response:', response.data);
        localStorage.setItem('token', response.data.token);
        // Handle the response from the server
        if(role === 'admin'){
          navigate('/admin/dashboard');
        }
        else if(role === 'sessionChair'){
        navigate('/session/dashboard',{ state: email });
        }
        else if(role === 'author'){
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.log('Login error:', error.response.data);
      }
    }
    }
    else{
      alert('Please select a role.');
    }
    // Here you would typically handle the login logic
  };


  const handleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
      <>
    <h2>Choose Account Here</h2>

    <div className={styles.container}>
        <div class={`${styles.card} ${selectedRole === 'admin' ? styles.selected : ''}`} id="admin-card" value="Admin" onClick={() => handleSelection("admin")} >
            <img src={adminImg} alt="Admin"/>
            <h3>Admin</h3>
        </div>
        <div class={`${styles.card} ${selectedRole === 'sessionChair' ? styles.selected : ''}`} id="session-chair-card" value="SessionChair" onClick={() =>handleSelection("sessionChair")}>
            <img src={sessionChairImg} alt="Session Chairs"/>
            <h3>Session Chairs</h3>
        </div>
        <div class={`${styles.card} ${selectedRole === 'author' ? styles.selected : ''}`} id="author-card" value="Author" onClick={() =>handleSelection("author")}>
            <img src={authorImg} alt="Authors"/>
            <h3>Authors</h3>
        </div>
    </div>

    <div class={styles.loginBox}>
        <input type="text" id="login-id" placeholder="Enter ID" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" id="login-password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>Login</button>
    </div>
    </>
  );
};

export default LoginForm;

