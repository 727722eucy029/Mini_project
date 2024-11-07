import React, { useState } from 'react';
import axios from 'axios';
import './StaffAuth.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth

const StaffSignIn = () => {
  const { setEmail, setUserId } = useAuth(); // Get setEmail and setUserId from context
  const [email, setEmailLocal] = useState(''); // Local state for email
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const emailDomain = '@skcet.ac.in';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};

    // Log the email and password being submitted
    console.log("Submitting form with Email:", email, "Password:", password);

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!email.endsWith(emailDomain)) {
      formErrors.email = `Only ${emailDomain} email addresses are allowed`;
    }

    if (!password) {
      formErrors.password = "Password is required";
    }

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/email/${email}`);
        const user = response.data;

        // Log the user object
        console.log("User fetched:", user);

        // Password comparison should ideally be done with a secure hash
        if (user && user.pass === password) {
          alert("Sign-in successful!");
          setEmail(email); // Store email in global state
          setUserId(user.id); // Store user ID in global state
          navigate('/HomePage', { state: { username: user.userName, role: user.role } });
        } else {
          setErrors({ password: "Incorrect password" });
        }

      } catch (error) {
        console.error("Error during sign-in:", error); // Log the error details
        if (error.response && error.response.status === 404) {
          setErrors({ email: "User not found" });
        } else {
          setErrors({ general: "An error occurred. Please try again later." });
        }
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="auth-page">
      <h1 className="page-title">Staff Sign In</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="auth-button">Sign In</button>
        {errors.general && <p className="error">{errors.general}</p>}
      </form>
      <p className="toggle-link" onClick={() => navigate('/signup')}>
        Don't have an account? Sign Up
      </p>
    </div>
  );
};

export default StaffSignIn;
