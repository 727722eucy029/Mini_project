import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { useAuth } from './AuthContext';

const ProfilePage = () => {
    const { email } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            if (!email) {
                setError('User not found. Please sign in again.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/profile/email/${encodeURIComponent(email)}`);
                console.log("Fetched profile data:", response.data); // Debugging
                setProfile(response.data);
                setUpdatedProfile(response.data); // Set initial state for editing
            } catch (err) {
                setError('Failed to fetch profile details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [email]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/api/profile/email/${encodeURIComponent(email)}`, updatedProfile);
            setProfile(updatedProfile); // Update local state with the new values
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
        setIsEditing(false); // Exit edit mode after saving
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!profile) {
        console.log("Profile data is not available or is null");
        return <div>Profile not found.</div>;
    }

    const { name = 'N/A', email: profileEmail = 'N/A', year = 'N/A', major = 'N/A', interests = [], registeredEvents = [] } = profile;

    return (
        <div className="profile-page" style={{ backgroundColor: 'white', color: 'black', padding: '20px' }}> 
            <header className="profile-header">
                <h1>Profile</h1>
            </header>
            
            <section className="profile-info">
                <div className="profile-details">
                    <h2>{isEditing ? <input type="text" name="name" value={updatedProfile.name} onChange={handleChange} /> : name}</h2>
                    <p>Email: {profileEmail}</p>
                    <p>
                        Year: {isEditing ? (
                            <select name="year" value={updatedProfile.year} onChange={handleChange}>
                                <option value="Freshman">I</option>
                                <option value="Sophomore">II</option>
                                <option value="Junior">III</option>
                                <option value="Senior">IV</option>
                            </select>
                        ) : year}
                    </p>
                    <p>
                        Major: {isEditing ? <input type="text" name="major" value={updatedProfile.major} onChange={handleChange} /> : major}
                    </p>
                    <button className="edit-details-btn" onClick={handleEditToggle}>{isEditing ? 'Cancel' : 'Edit Details'}</button>
                    {isEditing && <button className="save-details-btn" onClick={handleSave}>Save</button>}
                </div>
            </section>
            
            <section className="interests">
                <h2>Your Interests</h2>
                <div className="interests-list">
                    {interests.length > 0 ? (
                        interests.map((interest, index) => (
                            <span key={index} className="interest-tag">{interest}</span>
                        ))
                    ) : (
                        <p>No interests listed.</p>
                    )}
                </div>
                <button className="edit-interests-btn">Edit Interests</button>
            </section>

            <section className="registered-events">
                <h2>Registered Events</h2>
                <ul className="events-list">
                    {registeredEvents.length > 0 ? (
                        registeredEvents.map((event, index) => (
                            <li key={index} className="event-item">{event}</li>
                        ))
                    ) : (
                        <p>No events registered.</p>
                    )}
                </ul>
            </section>

            <footer className="profile-footer">
                <p>© 2024 Your College Event App</p>
            </footer>
        </div>
    );
};

export default ProfilePage;
