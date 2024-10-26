import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>Profile</h1>
            </header>
            
            <section className="profile-info">
                <div className="profile-pic-container">
                    <img src="path-to-profile-pic.jpg" alt="Profile" className="profile-pic" />
                    <button className="edit-pic-btn">Change Picture</button>
                </div>
                
                <div className="profile-details">
                    <h2>John Doe</h2>
                    <p>Email: johndoe@example.com</p>
                    <p>Year: Senior</p>
                    <p>Major: Computer Science</p>
                    <button className="edit-details-btn">Edit Details</button>
                </div>
            </section>
            
            <section className="interests">
                <h2>Your Interests</h2>
                <div className="interests-list">
                    <span className="interest-tag">Hackathons</span>
                    <span className="interest-tag">AI/ML</span>
                    <span className="interest-tag">Web Development</span>
                </div>
                <button className="edit-interests-btn">Edit Interests</button>
            </section>

            <section className="registered-events">
                <h2>Registered Events</h2>
                <ul className="events-list">
                    <li className="event-item">Hackathon 2024 - Nov 5, 2024</li>
                    <li className="event-item">AI/ML Workshop - Oct 15, 2024</li>
                    <li className="event-item">Web Dev Bootcamp - Sep 20, 2024</li>
                </ul>
            </section>

            <footer className="profile-footer">
                <p>© 2024 Your College Event App</p>
            </footer>
        </div>
    );
};

export default ProfilePage;
