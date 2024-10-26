import React from 'react';
import './EventModal.css'; // CSS for the modal

const EventModal = ({ event, onClose }) => {
  const { title, date, time,location, description, instruction, registrationLink } = event;

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
      </div>
    </div>
  );
};

export default EventModal;
