import React, { useState } from 'react';
import axios from 'axios';
import './StaffAuth.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth

const StaffSignUp = () => {
  const { setEmail } = useAuth(); // Get setEmail from context
  const [email, setEmailLocal] = useState(''); // Local state for email
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const emailDomain = '@skcet.ac.in';
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email.endsWith(emailDomain)) {
      alert(`Only ${emailDomain} email addresses are allowed.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/generate-otp', { email });
      console.log(response.data);
      setOtpSent(true);
      alert("OTP has been sent to your email.");
    } catch (error) {
      console.error("Error sending OTP:", error.response ? error.response.data : error.message);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};

    if (!username) formErrors.username = "Username is required";
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!email.endsWith(emailDomain)) {
      formErrors.email = `Only ${emailDomain} email addresses are allowed`;
    }

    if (!password) formErrors.password = "Password is required";
    if (otpSent && !otp) formErrors.otp = "OTP is required";

    if (Object.keys(formErrors).length === 0) {
      try {
        const otpValidationResponse = await axios.post('http://localhost:8080/api/users/validate-otp', { email, otp });
        
        if (otpValidationResponse.data) {
          const signupResponse = await axios.post('http://localhost:8080/api/users', { 
            email, 
            pass: password,
            userName: username,
            role: 'student'
          });
          alert("Account created successfully!");
          setEmail(email); // Store email in global state
          navigate('/ProfileForm', { state: { username, role: 'faculty' } });
          // Clear local state after successful signup
          setEmailLocal('');
          setUsername('');
          setPassword('');
          setOtp('');
          setOtpSent(false);
        } else {
          alert("Invalid OTP. Please try again.");
          setOtp('');
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        alert("Failed to sign up. Please check your OTP or try again.");
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="auth-page">
      <h1 className="page-title">Staff Sign Up</h1>
      
      {/* Link to Faculty Signup */}
      
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmailLocal(e.target.value)} // Update local state
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {otpSent && (
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            {errors.otp && <span className="error">{errors.otp}</span>}
          </div>
        )}
        {!otpSent && (
          <button type="button" onClick={sendOtp} className="auth-button">
            Send OTP
          </button>
        )}
        {otpSent && (
          <button type="submit" className="auth-button">Sign Up</button>
        )}
      </form>
      <p className="toggle-link" onClick={() => navigate('/')}>
        Already have an account? Sign In
      </p>
      <p className="toggle-link">
        If you are faculty, <span onClick={() => navigate('/staffsignup')} className="link">sign up here</span>.
      </p>
    </div>
  );
};

export default StaffSignUp;
