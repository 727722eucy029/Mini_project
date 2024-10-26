import React, { useState } from 'react';
import './EventForm.css';

const EventForm = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    instruction: '',
    location: '',
    date: '',
    time: '',
    category: '',
    status: 0, // Default status value
    registrationLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend API
      const response = await fetch('http://localhost:8080/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to submit event details');
      }

      const data = await response.json();
      console.log('Event created successfully:', data);

      // Clear the form after successful submission
      setEventDetails({
        title: '',
        description: '',
        instruction: '',
        location: '',
        date: '',
        time: '',
        category: '',
        status: 1,
        registrationLink: '',
      });
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  return (
    <div className="add-event-form">
      <h2>Post an Event</h2>
      <form onSubmit={handleSubmit}>

        {/* Event Title */}
        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventDetails.title}
            onChange={handleChange}
            required
            placeholder="Enter event title"
          />
        </div>

        {/* Event Description */}
        <div className="form-group">
          <label htmlFor="description">Event Description:</label>
          <textarea
            id="description"
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            required
            placeholder="Enter a brief description of the event"
          />
        </div>

        {/* Instructions */}
        <div className="form-group">
          <label htmlFor="instruction">Instructions:</label>
          <textarea
            id="instruction"
            name="instruction"
            value={eventDetails.instruction}
            onChange={handleChange}
            placeholder="Enter event instructions"
          />
        </div>
        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <textarea
            id="location"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
            placeholder="Enter event location"
          />
        </div>

       

        {/* Event Date */}
        <div className="form-group">
          <label htmlFor="date">Event Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Event Time */}
        <div className="form-group">
          <label htmlFor="time">Event Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventDetails.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Event Category */}
        <div className="form-group">
          <label htmlFor="category">Event Category:</label>
          <select
            id="category"
            name="category"
            value={eventDetails.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="conference">Conference</option>
            <option value="hackathon">Hackathon</option>
            <option value="cultural">Cultural Fest</option>
          </select>
        </div>

        {/* Registration Link */}
        <div className="form-group">
          <label htmlFor="registrationLink">Registration Link:</label>
          <input
            type="url"
            id="registrationLink"
            name="registrationLink"
            value={eventDetails.registrationLink}
            onChange={handleChange}
            required
            placeholder="Enter the registration URL"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Post Event</button>
      </form>
    </div>
  );
};

export default EventForm;
