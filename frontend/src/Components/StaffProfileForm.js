import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileForm.css';
import { useNavigate } from 'react-router-dom';

const ProfileForm = ({ existingProfile, role }) => {
    const [name, setName] = useState(existingProfile?.name || '');
    const [email, setEmail] = useState(existingProfile?.email || '');
    const [year, setYear] = useState(existingProfile?.year || '');
    const [major, setMajor] = useState(existingProfile?.major || '');
    const [interests, setInterests] = useState(existingProfile?.interests || []);
    const [showInterestDropdown, setShowInterestDropdown] = useState(false);
    const navigate = useNavigate();

    const interestOptions = [
        "Hackathons", "AI/ML", "Web Development", "Cybersecurity", "Data Science",
        "Graphic Design", "Public Speaking", "Project Management", "Photography",
        "Marketing", "Networking", "Content Writing", "Programming", "Blockchain",
        "UI/UX Design", "Machine Learning", "Event Planning", "Team Leadership"
    ];

    const toggleInterestDropdown = () => {
        setShowInterestDropdown(!showInterestDropdown);
    };

    const handleInterestChange = (interest) => {
        setInterests((prevInterests) =>
            prevInterests.includes(interest)
                ? prevInterests.filter((i) => i !== interest)
                : [...prevInterests, interest]
        );
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const profileData = {
            name,
            email,
            year: role === 'student' ? year : null, // Only save 'year' if role is student
            major,
            interests,
        };

        try {
            const response = existingProfile
                ? await axios.put(`http://localhost:8080/api/profile/${existingProfile.id}`, profileData)
                : await axios.post('http://localhost:8080/api/profile', profileData);

            console.log('Profile saved successfully:', response.data);
            alert('Profile saved successfully!');
            navigate('/HomePage');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        }
    };

    useEffect(() => {
        if (existingProfile) {
            setName(existingProfile.name);
            setEmail(existingProfile.email);
            setYear(existingProfile.year);
            setMajor(existingProfile.major);
            setInterests(existingProfile.interests);
        }
    }, [existingProfile]);

    return (
        <div className="profile-form-page">
            <form className="profile-form" onSubmit={handleFormSubmit}>
                <h1>{existingProfile ? 'Edit Your Profile' : 'Complete Your Profile'}</h1>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Only show 'Year' field if role is student */}
                {role === 'student' && (
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <select
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        >
                            <option value="">Select Year</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                        </select>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="major">Major</label>
                    <input
                        type="text"
                        id="major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="interests">Interests</label>
                    <div className="custom-dropdown" onClick={toggleInterestDropdown}>
                        {interests.length > 0 ? interests.join(', ') : 'Select Interests'}
                        <span className="dropdown-arrow">▼</span>
                    </div>
                    {showInterestDropdown && (
                        <div className="dropdown-menu">
                            {interestOptions.map((interest) => (
                                <label key={interest} className="dropdown-item">
                                    <input
                                        type="checkbox"
                                        checked={interests.includes(interest)}
                                        onChange={() => handleInterestChange(interest)}
                                    />
                                    {interest}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" className="submit-btn">{existingProfile ? 'Update Profile' : 'Save Profile'}</button>
            </form>
        </div>
    );
};

export default ProfileForm;
