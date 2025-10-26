import { useState } from "react";
import "./App.css";
// App.tsx
import RegistrationModal from "./RegistrationModal";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <div className="logo-left">
          <img src="/sterling-logo.png" alt="Sterling College" />
        </div>
        <div className="title-center">
          <h1>Sterling College</h1>
          <h2>7v7 Knockout Soccer Tournament</h2>
        </div>
        <div className="logo-right">
          <img src="/skc-logo.png" alt="SKC Logo" />
        </div>
      </header>
      {/* Navigation */}
      <nav className="navbar">
        <a href="#register">Register</a>
        <a href="#prizes">Prizes</a>
        <a href="#fees">Entry Fees</a>
        <a href="#rules">Rules</a>
      </nav>
      <div className="app-container">
        <button onClick={() => setShowModal(true)}>Register Team</button>
        {showModal && <RegistrationModal onClose={() => setShowModal(false)} />}
      </div>
      {/* Prize Money Section */}
      <section id="prizes" className="info-section">
        <h2>🏆 Prize Money</h2>
        <ul>
          <li>Winner: ₹25,000</li>
          <li>Runner-up: ₹10,000</li>
          <li>Best Player: ₹5,000</li>
        </ul>
      </section>
      {/* Entry Fees Section */}
      <section id="fees" className="info-section">
        <h2>💸 Entry Fees</h2>
        <p>Registration Fee: ₹500 per team</p>
      </section>
      {/* Rules Section */}
      <section id="rules" className="info-section">
        <h2>📜 Rules & Eligibility</h2>
        <ul>
          <li>Only college teams from Navi Mumbai eligible</li>
          <li>7 players per team, knockout format</li>
          <li>Valid Aadhaar required for all players</li>
        </ul>
      </section>
      {/* Sponsors Section */}
      <section id="sponsors" className="info-section">
        <h2>🤝 Sponsors</h2>
        <div className="sponsor-logos">
          <img src="/sponsor1.png" alt="Sponsor 1" />
          <img src="/sponsor2.png" alt="Sponsor 2" />
        </div>
      </section>
      {/* Promotional Section */}
      <section id="promo" className="info-section">
        <h2>📣 Promotion</h2>
        <p>“Once-in-years event” inviting all Navi Mumbai colleges!</p>
        <blockquote>“Play with passion, win with pride.”</blockquote>
      </section>
    </div>
  );
}

export default App;
