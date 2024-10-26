import React, { useState, useEffect } from 'react';
import './ExploreEventsPage.css';
import EventModal from './EventModal'; // Modal component for viewing event details
import axios from 'axios';

const ExploreEventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/event'); // Adjust API URL as needed
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="explore-events-page">
      <header className="header">
        <div className="logo">College Logo</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#profile">Profile</a>
          <a href="#admin">Admin</a>
          <a href="#help">Help</a>
        </nav>
      </header>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
            <img src={event.image || 'default-image.jpg'} alt={event.title} />
            <div className="event-card-content">
              <h3>{event.title}</h3>
              <p>Date: {event.date} | Time: {event.time} | Location: {event.location}</p>
              <button className="event-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={handleCloseModal} />}
    </div>
  );
};

export default ExploreEventsPage;
