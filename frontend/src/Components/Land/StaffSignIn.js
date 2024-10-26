import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import './StaffAuth.css'; // Import the CSS for styling
import { useNavigate } from 'react-router-dom';

const StaffSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const emailDomain = '@skcet.ac.in';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};

    // Validate email and password
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!email.endsWith(emailDomain)) {
      formErrors.email = `Only ${emailDomain} email addresses are allowed`;
    }

    if (!password) {
      formErrors.password = "Password is required";
    }

    // If no validation errors, proceed with login attempt
    if (Object.keys(formErrors).length === 0) {
      try {
        // Make a GET request to check if the user exists by email
        const response = await axios.get(`http://localhost:8080/api/users/email/${email}`);

        const user = response.data;

        // Check if the retrieved user's password matches the input password
        if (user && user.pass === password) {
          // Credentials are correct, navigate to HomePage with user info
          alert("Sign-in successful!");
          console.log("Signed in with:", { email, password });
          console.log("User object:", user);
          navigate('/HomePage', { state: { username: user.userName, role: user.role } });

          // Pass username and role
        } else {
          // Password mismatch
          setErrors({ password: "Incorrect password" });
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        if (error.response && error.response.status === 404) {
          // User not found in the database
          setErrors({ email: "User not found" });
        } else {
          // Handle general error
          setErrors({ general: "An error occurred. Please try again later." });
        }
      }
    } else {
      setErrors(formErrors); // Set validation errors to state
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
