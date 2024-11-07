import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import './EventModal.css';

const EventModal = ({ event, onClose }) => {
  const { title, date, time, location, description, instruction, registrationLink, id: eventId, posterEmail } = event; 
  const { email } = useAuth(); // Access userEmail from context
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]); // State for registered users

  // Fetch registered users if the current user is the event poster
  useEffect(() => {
    if (email === posterEmail) {
      fetchRegisteredUsers();
    }
  }, [email, posterEmail]);

  const fetchRegisteredUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/event-registrations/event/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch registered users');
      }
      const data = await response.json();
      setRegisteredUsers(data); // Set registered users data
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      name: formData.name,
      email: formData.email,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/event-registrations/register/${eventId}/${formData.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register for the event. Please try again.');
      }

      const data = await response.json();
      console.log('Registration Successful:', data);
      setSuccessMessage('Registration Successful!');
      setShowRegisterForm(false);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>

        <h2>{title}</h2>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Location:</strong> {location}</p>
        {description && <p><strong>Description:</strong> {description}</p>}
        {instruction && <p><strong>Instructions:</strong> {instruction}</p>}
        {registrationLink && (
          <p>
            <strong>Registration Link:</strong> 
            <a href={registrationLink} target="_blank" rel="noopener noreferrer">
              {registrationLink}
            </a>
          </p>
        )}

        {/* Display registered users if the current user is the poster */}
        {email === posterEmail && (
          <>
            <h3>Registered Users</h3>
            {registeredUsers.length > 0 ? (
              <ul>
                {registeredUsers.map((user) => (
                  <li key={user.id}>
                    {user.name} ({user.email})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users have registered yet.</p>
            )}
          </>
        )}

        {/* Show Register button if the current user is not the poster */}
        {!successMessage && !showRegisterForm && email !== posterEmail && (
          <button className="register-button" onClick={() => setShowRegisterForm(true)}>
            Register
          </button>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {showRegisterForm && (
          <form className="registration-form" onSubmit={handleFormSubmit}>
            <h3>Register for Event</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventModal;
