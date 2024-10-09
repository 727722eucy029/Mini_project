import React, { useState } from 'react';
import './ExploreEventsPage.css';
import EventModal from './EventModal'; // Modal component for viewing event details

const ExploreEventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      image: 'event1.jpg',
      title: 'Annual Hackathon',
      date: '15th Oct',
      location: 'Hall A',
    },
    {
      id: 2,
      image: 'event2.jpg',
      title: 'AI Workshop',
      date: '20th Oct',
      location: 'Lab B',
    },
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    
    <div className="explore-events-page">
      {/* Other sections omitted for brevity */}
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
            <img src={event.image} alt={event.title} />
            <div className="event-card-content">
              <h3>{event.title}</h3>
              <p>Date: {event.date} | Location: {event.location}</p>
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
