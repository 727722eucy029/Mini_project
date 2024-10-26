// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css'; // Import the CSS for styling

// import logoImage from '../assets/logo.png'; // Update with the path to your image

const LandingPage = () => {
  const handleRedirect = (url) => {
    window.location.href = url; // Redirect to the specified URL
  };

  return (
    <div className="landing-page">
      <div className="background-shape"></div> {/* Background shape for aesthetic */}
      {/* <img src={logoImage} alt="Eventus Eye Logo" className="logo-image" /> Center image */}
      <h1 className="page-title">Eventus Eye</h1> {/* Heading placed at the top */}
      {/* <div><img src={logo}/></div> */}
      <div className="landing-container">
        <div className="compartment compartment-1" onClick={() => handleRedirect('/staff-signin')}>
          <h2>SKCET Staffs Login</h2>
          <p>Access event management tools and resources.</p>
        </div>
        <div className="compartment compartment-2" onClick={() => handleRedirect('/students-login')}>
          <h2>Students Login</h2>
          <p>Join events, discover opportunities, and stay connected.</p>
        </div>
        <div className="compartment compartment-3" onClick={() => handleRedirect('/other-organisations')}>
          <h2>Other Organisations</h2>
          <p>Partner with us for event collaborations and initiatives.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
