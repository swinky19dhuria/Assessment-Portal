// import React from 'react';
// import './Home.css';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const navigate = useNavigate();

//   const handleGetStartedClick = () => {
//     navigate('/login'); // Navigate to the LoginRegister page
//   };

//   return (
//     <div className="home-container">
//       <nav className="navbar">
//         <div className="logo">
//           Take <span>Test</span>
//         </div>
//         <ul className="nav-links">
//           <li>About</li>
//           <li>Services</li>
//           <li>FAQs</li>
//         </ul>
//       </nav>
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>Take Test: Your Gateway to Coding Success</h1>
//           <p>
//             Take Test is a cutting-edge platform designed to assess and enhance your
//             programming skills. Join the community of aspiring and accomplished
//             programmers and unlock your full potential with Take Test!
//           </p>
//           <button className="btn-primary">Find Out More</button>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/options'); // Navigate to the LoginRegister page
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">
          Take <span>Test</span>
        </div>
        <ul className="nav-links">
          <li>About</li>
          <li>Services</li>
          <li>FAQs</li>
        </ul>
      </nav>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Take Test: Your Gateway to Coding Success</h1>
          <p>
            Take Test is a cutting-edge platform designed to assess and enhance your
            programming skills. Join the community of aspiring and accomplished
            programmers and unlock your full potential with Take Test!
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
