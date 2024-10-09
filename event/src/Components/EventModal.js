import React from 'react';
import './EventModal.css'; // CSS for the modal

const EventModal = ({ event, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        {/* Additional event details */}
      </div>
    </div>
  );
};

export default EventModal;
