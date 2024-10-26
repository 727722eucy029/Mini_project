import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './StaffAuth.css'; // Import the CSS for styling
import { useNavigate } from 'react-router-dom';
const StaffSignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const emailDomain = '@skcet.ac.in';
  const [errors, setErrors] = useState({});
  const navigate =useNavigate();
  

  // Function to send OTP to the backend
  const sendOtp = async () => {
    if (!email.endsWith(emailDomain)) {
      alert(`Only ${emailDomain} email addresses are allowed.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/generate-otp', { email });
      console.log(response.data); // Log the response from the server
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

    if (!username) {
      formErrors.username = "Username is required"; // Validate username
    }

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!email.endsWith(emailDomain)) {
      formErrors.email = `Only ${emailDomain} email addresses are allowed`;
    }

    if (!password) formErrors.password = "Password is required";
    
    // If OTP is sent, validate it
    if (otpSent && !otp) {
      formErrors.otp = "OTP is required";
    }

    if (Object.keys(formErrors).length === 0) {
      try {
        // First, validate OTP
        const otpValidationResponse = await axios.post('http://localhost:8080/api/users/validate-otp', { email, otp });
        console.log("OTP validation response:", otpValidationResponse.data); // Log the response

        if (otpValidationResponse.data) {
          // OTP is valid, proceed to create user
          const signupResponse = await axios.post('http://localhost:8080/api/users', { 
            email, 
            pass: password,  // Map password to 'pass'
            userName: username,  // Include username
            role: 'faculty' // Set default role
          });
          console.log("Sign-up successful:", signupResponse.data); // Log the successful response
          alert("Account created successfully!");
          navigate('/HomePage', { state: { username, role: 'faculty' } });
          // Reset the form or redirect after successful sign-up
          setEmail('');
          setUsername(''); // Reset username
          setPassword('');
          setOtp('');
          setOtpSent(false);
        } else {
          alert("Invalid OTP. Please try again.");
          setOtp(''); // Clear the OTP field
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
            onChange={(e) => setEmail(e.target.value)}
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
        
        {!otpSent ? (
          <button
            type="button"
            className="auth-button"
            onClick={sendOtp}
            disabled={!email.endsWith(emailDomain)} // Disable OTP sending if email domain is invalid
          >
            Send OTP
          </button>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {errors.otp && <span className="error">{errors.otp}</span>}
            </div>
            <button type="submit" className="auth-button" >
              Verify and Sign Up
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default StaffSignUp;
