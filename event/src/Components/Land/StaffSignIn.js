// src/components/StaffSignIn.js
import React, { useState } from 'react';
// import Navbar from './Navbar'; // Import the Navbar component
import './StaffAuth.css'; // Import the CSS for styling

const StaffSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    const emailDomain = '@skcet.ac.in';

    // Email validation for @skcet.ac.in domain
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!email.endsWith(emailDomain)) {
      formErrors.email = `Only ${emailDomain} email addresses are allowed`;
    }

    if (!password) formErrors.password = "Password is required";

    if (Object.keys(formErrors).length === 0) {
      // Simulate sign-in logic
      console.log("Signed in with:", { email, password });
      // Reset the form or redirect after successful sign-in
    } else {
      setErrors(formErrors);
    }
  };

  const handleRedirect = (url) => {
    window.location.href = url; // Redirect to the specified URL
  };

  return (
    <>
      {/* <Navbar /> Add the Navbar at the top */}
      <div className="auth-page">
        <h1 className="page-title">Staff Sign In</h1>
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
          <button type="submit" className="auth-button" onClick={()=> handleRedirect('/')}>Sign In</button>
        </form>
        <p className="toggle-link" onClick={() => handleRedirect('/signup')}>
          Don't have an account? Sign Up
        </p>
      </div>
    </>
  );
};

export default StaffSignIn;
