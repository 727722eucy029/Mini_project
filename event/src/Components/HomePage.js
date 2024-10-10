import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Add CSS styles
import Seminar from '../Pictures/Seminar.jpg';
import Hackathon from '../Pictures/Hackathons.jpg';
import Cultural from '../Pictures/cultural.jpg';
import Workshop from '../Pictures/workshop.jpg';
import Conference from '../Pictures/conference.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Sample data for the carousel items
  const carouselItems = [
    { imgSrc: Seminar, title: 'Seminars' },
    { imgSrc: Hackathon, title: 'Hackathons' },
    { imgSrc: Cultural, title: 'Cultural Fest' },
    { imgSrc: Workshop, title: 'Workshops' },
    { imgSrc: Conference, title: 'Conferences' },
  ];

  const handleExplore = () => {
    navigate('/ExploreEvents');
  };
  const handleRedirect = (url) => {
    window.location.href = url; // Redirect to the specified URL
  };

  // Settings for the react-slick carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="homepage">
      {/* Header */}
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

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-text">
            <h2>Explore Our Events</h2>
            <p>
              Discover a wide range of events at our college, from hackathons to seminars,
              cultural fests to workshops. Whether you're looking to learn something new
              or showcase your skills, we've got an event for you!
            </p>
            <div className="cta-buttons">
              <button className="cta-btn" onClick={handleExplore}>Explore Events</button>
              <button className="cta-btn" onClick={()=>handleRedirect('land')}>Create Profile</button>
            </div>
          </div>
          
          <div className="carousel-wrapper">
            <Slider {...settings}>
              {carouselItems.map((item, index) => (
                <div className="carousel-item" key={index}>
                  <img src={item.imgSrc} alt={item.title} />
                  <h3>{item.title}</h3>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="featured-events">
        <h2>Upcoming Events</h2>
        <div className="event-cards">
          <div className="event-card">
            <img src="event1.jpg" alt="Event 1" />
            <h3>Tech Workshop</h3>
            <p>Date: October 20, 2024</p>
            <button className="event-btn">Register</button>
          </div>
          <div className="event-card">
            <img src="event2.jpg" alt="Event 2" />
            <h3>Cultural Fest</h3>
            <p>Date: November 5, 2024</p>
            <button className="event-btn">Register</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="quick-links">
          <a href="#events">Events</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact Us</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
        <div className="social-media">
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
        <div className="newsletter">
          <h3>Subscribe to Newsletter</h3>
          <input type="email" placeholder="Enter your email" />
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
