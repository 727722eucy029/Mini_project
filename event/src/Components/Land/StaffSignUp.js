// src/components/StaffSignUp.js
import React, { useState } from 'react';
// import Navbar from './Navbar'; // Import the Navbar component
import './StaffAuth.css'; // Import the CSS for styling

const StaffSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [errors, setErrors] = useState({});
  const emailDomain = '@skcet.ac.in';

  // Function to simulate OTP generation and sending
  const sendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Random 6-digit OTP
    console.log("Generated OTP:", generatedOtp); // Simulate sending the OTP
    setGeneratedOtp(generatedOtp);
    setOtpSent(true);
    alert("OTP has been sent to your email.");
    // Here you would integrate your email service to send OTP
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!email.endsWith(emailDomain)) {
      formErrors.email = `Only ${emailDomain} email addresses are allowed`;
    }

    if (!password) formErrors.password = "Password is required";
    
    // If OTP is sent, validate it
    if (otpSent && otp !== generatedOtp) {
      formErrors.otp = "Invalid OTP";
    }

    if (Object.keys(formErrors).length === 0) {
      // Simulate sign-up logic
      console.log("Signed up with:", { email, password });
      alert("Account created successfully!");
      // Reset the form or redirect after successful sign-up
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      {/* <Navbar /> Add the Navbar at the top */}
      <div className="auth-page">
        <h1 className="page-title">Staff Sign Up</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
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
              <button type="submit" className="auth-button">
                Verify and Sign Up
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default StaffSignUp;
