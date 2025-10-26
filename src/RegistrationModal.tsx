import { useState } from "react";
import "./App.css";

interface RegistrationModalProps {
  onClose: () => void;
}

function RegistrationModal({ onClose }: RegistrationModalProps) {
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
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
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
      </div>
    </div>
  );
}

export default RegistrationModal;
