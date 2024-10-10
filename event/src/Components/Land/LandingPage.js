// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css'; // Import the CSS for styling

const LandingPage = () => {
  const handleRedirect = (url) => {
    window.location.href = url; // Redirect to the specified URL
  };

  return (
    <div className="landing-page">
      <div className="background-shape"></div> {/* Background shape for aesthetic */}
      <h1 className="page-title">Eventus Eye</h1> {/* Heading placed at the top */}
      <div className="landing-container">
        <div className="compartment compartment-1" onClick={() => handleRedirect('/staff-signin')}>
          <h2>SKCET Staffs Login</h2>
          <p>Discover the beauty of nature and explore breathtaking landscapes.</p>
        </div>
        <div className="compartment compartment-2" onClick={() => handleRedirect('/students-login')}>
          <h2>Students Login</h2>
          <p>Embark on thrilling adventures and create unforgettable memories.</p>
        </div>
        <div className="compartment compartment-3" onClick={() => handleRedirect('/other-organisations')}>
          <h2>Other Organisations</h2>
          <p>Find your perfect getaway and relax in serene surroundings.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
