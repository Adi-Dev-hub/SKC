import { useState } from "react";
import "./App.css";

function App() {
  const initialForm = {
    collegeName: "",
    captainName: "",
    captainAadhaar: "",
    captainPhone1: "",
    captainPhone2: "",
    captainEmail: "",
    players: Array(7).fill({ name: "", aadhaar: "", phone: "" }),
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
    field?: string
  ) => {
    const { name, value } = e.target;
    if (index !== undefined && field) {
      const updatedPlayers = [...formData.players];
      updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
      setFormData((prev) => ({ ...prev, players: updatedPlayers }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Team registration successful");
    // TODO: Send confirmation email to captain
    setFormData(initialForm);
  };

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
        <a href="#sponsors">Sponsors</a>
        <a href="#promo">Promo</a>
      </nav>

      {/* Registration Form */}
      <section id="register" className="form-section">
        <h2>Team Registration</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <input
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
            placeholder="College Name"
          />
          <input
            name="captainName"
            value={formData.captainName}
            onChange={handleChange}
            required
            placeholder="Captain’s Full Name"
          />
          <input
            name="captainAadhaar"
            value={formData.captainAadhaar}
            onChange={handleChange}
            required
            placeholder="Captain’s Aadhaar Number"
          />
          <input
            name="captainPhone1"
            value={formData.captainPhone1}
            onChange={handleChange}
            required
            placeholder="Captain’s Phone Number 1"
          />
          <input
            name="captainPhone2"
            value={formData.captainPhone2}
            onChange={handleChange}
            required
            placeholder="Captain’s Phone Number 2"
          />
          <input
            name="captainEmail"
            type="email"
            value={formData.captainEmail}
            onChange={handleChange}
            required
            placeholder="Captain’s Email"
          />

          <h3>Players</h3>
          {formData.players.map((player, index) => (
            <div key={index} className="player-fields">
              <input
                value={player.name}
                onChange={(e) => handleChange(e, index, "name")}
                required
                placeholder={`Player ${index + 1} Name`}
              />
              <input
                value={player.aadhaar}
                onChange={(e) => handleChange(e, index, "aadhaar")}
                required
                placeholder={`Player ${index + 1} Aadhaar`}
              />
              <input
                value={player.phone}
                onChange={(e) => handleChange(e, index, "phone")}
                required
                placeholder={`Player ${index + 1} Mobile`}
              />
            </div>
          ))}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </section>

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
