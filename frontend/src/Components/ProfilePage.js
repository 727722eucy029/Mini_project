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
    const [isEditingInterests, setIsEditingInterests] = useState(false);
    const [updatedInterests, setUpdatedInterests] = useState([]);
    const [showInterestDropdown, setShowInterestDropdown] = useState(false);

    const interestOptions = [
        "Hackathons", "AI/ML", "Web Development", "Cybersecurity", "Data Science",
        "Graphic Design", "Public Speaking", "Project Management", "Photography",
        "Marketing", "Networking", "Content Writing", "Programming", "Blockchain",
        "UI/UX Design", "Machine Learning", "Event Planning", "Team Leadership"
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            if (!email) {
                setError('User not found. Please sign in again.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/profile/email/${encodeURIComponent(email)}`);
                console.log("Fetched profile data:", response.data);
                setProfile(response.data);
                setUpdatedProfile(response.data);
                setUpdatedInterests(response.data.interests || []); // Initialize interests
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
            setProfile(updatedProfile);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
        setIsEditing(false);
    };

    const toggleInterestDropdown = () => {
        setShowInterestDropdown(!showInterestDropdown);
    };

    const handleInterestChange = (interest) => {
        setUpdatedInterests((prevInterests) =>
            prevInterests.includes(interest)
                ? prevInterests.filter((i) => i !== interest)
                : [...prevInterests, interest]
        );
    };

    const handleSaveInterests = async () => {
        try {
            await axios.put(`http://localhost:8080/api/profile/email/${encodeURIComponent(email)}/interests`, updatedInterests);
            setProfile((prev) => ({ ...prev, interests: updatedInterests })); // Update profile with new interests
            alert('Interests updated successfully!');
        } catch (error) {
            console.error('Error updating interests:', error);
            alert('Failed to update interests. Please try again.');
        }
        setIsEditingInterests(false);
        setShowInterestDropdown(false); // Close dropdown after saving
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
                                <option value="I">I</option>
                                <option value="II">II</option>
                                <option value="III">III</option>
                                <option value="IV">IV</option>
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
                    {isEditingInterests ? (
                        <div className="custom-dropdown" onClick={toggleInterestDropdown}>
                            {updatedInterests.length > 0 ? updatedInterests.join(', ') : 'Select Interests'}
                            <span className="dropdown-arrow">▼</span>
                        </div>
                    ) : (
                        updatedInterests.length > 0 ? (
                            updatedInterests.map((interest, index) => (
                                <span key={index} className="interest-tag">{interest}</span>
                            ))
                        ) : (
                            <p>No interests listed.</p>
                        )
                    )}
                    {isEditingInterests && showInterestDropdown && (
                        <div className="dropdown-menu">
                            {interestOptions.map((interest) => (
                                <label key={interest} className="dropdown-item">
                                    <input
                                        type="checkbox"
                                        checked={updatedInterests.includes(interest)}
                                        onChange={() => handleInterestChange(interest)}
                                    />
                                    {interest}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <button className="edit-interests-btn" onClick={isEditingInterests ? handleSaveInterests : () => { setIsEditingInterests(true); toggleInterestDropdown(); }}>
                    {isEditingInterests ? 'Save Interests' : 'Edit Interests'}
                </button>
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
