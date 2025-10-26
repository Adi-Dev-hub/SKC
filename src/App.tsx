//App.tsx

import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import Spykar from "./assets/Spykar.png";
import Redbull from "./assets/Red-Bull-Logo-Transparent.png";
import coffee from "./assets/Caffecofeday.png";
import "./App.css";
function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <div className="logo-left">
          <img src="/Sterling_logo.png" alt="Sterling College" />
        </div>
        <div className="title-center">
          <h1>Sterling College</h1>
          <h2>7v7 Knockout Soccer Tournament</h2>
        </div>
        <div className="logo-right">
          <img src="/SKC_logo.png" alt="SKC Logo" />
        </div>
      </header>
      {/* Navigation */}
      <nav className="navbar">
        <a href="#register">Register</a>
        <a href="#prizes">Prizes</a>
        <a href="#fees">Entry Fees</a>
        <a href="#rules">Rules</a>
      </nav>
      {/* Main Content */}
      {showForm ? (
        <RegistrationForm onClose={() => setShowForm(false)} />
      ) : (
        <main>
          {/* Your homepage sections: prizes, rules, sponsors, etc. */}
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
              <img src={Spykar} alt="Sponsor 1" />
              <img src={Redbull} alt="Sponsor 2" />
              <img src={coffee} alt="Sponsor 3" />
            </div>
          </section>
          {/* Promotional Section */}
          <section id="promo" className="info-section">
            <h2>📣 Promotion</h2>
            <p>“Once-in-years event” inviting all Navi Mumbai colleges!</p>
            <blockquote>“Play with passion, win with pride.”</blockquote>
          </section>
          <section className="promo">
            <h2>Once-in-years event!</h2>
            <button
              className="btn btn-success"
              onClick={() => setShowForm(true)}
            >
              Register Your Team
            </button>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
