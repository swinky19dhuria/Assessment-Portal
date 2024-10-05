import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/register'); // Navigate to the LoginRegister page
  };

  return (
    <div className="home-container">
      {/* <nav className="navbar">
        <div className="logo">
          Take <span>Test</span>
        </div>
        <ul className="nav-links">
          <li>About</li>
          <li>Services</li>
          <li>FAQs</li>
        </ul>
      </nav> */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>TASK FLOW: Stay organized and focused</h1>
          <p>
          A smart and intuitive to-do list platform that transforms the way you manage your tasks. 
          Whether it's daily chores or work projects, TaskFlow empowers you to streamline your workflow, set reminders, and track progress effortlessly. 
          Stay on top of your priorities, and achieve more with TaskFlow—your ultimate productivity companion!
          </p>
          <button className="btn-primary" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
