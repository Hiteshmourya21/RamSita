import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import adminImg from '../../img/Admin.png';
import sessionChairImg from '../../img/Session.jpg';
import authorImg from '../../img/Student.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { axiosInstance } from '../../lib/axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if(selectedRole){
      if (!email || !password) {
        toast.error('Please fill in all fields', { position: "top-right" });
      }
      else{
        const loadingToastId = toast.loading("Logging in, please wait...", { position: "top-right" });
      try{
        const role = selectedRole;
        const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, { email, password, role });
        localStorage.setItem('token', response.data.token);
        // Handle the response from the server
        if(role === 'admin'){
          navigate('/admin/dashboard');
        }
        else if(role === 'sessionChair'){
        navigate('/session/dashboard',{ state: email });
        }
        else if(role === 'author'){
          navigate('/author/dashboard',{ state: email });
        }

        toast.update(loadingToastId, {
               render: response.data.message,
               type: "success",
               isLoading: false,
               autoClose: 3000,
             });
       } catch (error) {
         console.error(error);
      
         // Update the loading toast to error
         toast.update(loadingToastId, {
           render: "Error Logging in. Please try again!",
           type: "error",
           isLoading: false,
           autoClose: 3000,
         });
       }
    }
    }
    else{
      toast.error("Please select a role!", { position: "top-right" });
    }
    // Here you would typically handle the login logic
  };


  const handleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
      <>
    <h2>Choose Account Here</h2>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
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

