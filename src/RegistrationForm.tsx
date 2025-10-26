//RegistrationForm.tsx
import { useState } from "react";
import "./RegistrationForm.css";

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
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
    setFormData(initialForm);
  };

  return (
    <div className="form-fullscreen bg-white p-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Team Registration</h2>
          <button className="btn btn-outline-danger" onClick={onClose}>
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                required
                placeholder="College Name"
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="captainName"
                value={formData.captainName}
                onChange={handleChange}
                required
                placeholder="Captain’s Full Name"
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="captainAadhaar"
                value={formData.captainAadhaar}
                onChange={handleChange}
                required
                placeholder="Captain’s Aadhaar Number"
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="captainEmail"
                type="email"
                value={formData.captainEmail}
                onChange={handleChange}
                required
                placeholder="Captain’s Email"
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="captainPhone1"
                value={formData.captainPhone1}
                onChange={handleChange}
                required
                placeholder="Captain’s Phone Number 1"
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="captainPhone2"
                value={formData.captainPhone2}
                onChange={handleChange}
                required
                placeholder="Captain’s Phone Number 2"
              />
            </div>
          </div>

          <h4 className="mt-4">Players</h4>
          {formData.players.map((player, index) => (
            <div className="row g-3 mb-2" key={index}>
              <div className="col-md-4">
                <input
                  className="form-control"
                  value={player.name}
                  onChange={(e) => handleChange(e, index, "name")}
                  required
                  placeholder={`Player ${index + 1} Name`}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  value={player.aadhaar}
                  onChange={(e) => handleChange(e, index, "aadhaar")}
                  required
                  placeholder={`Player ${index + 1} Aadhaar`}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  value={player.phone}
                  onChange={(e) => handleChange(e, index, "phone")}
                  required
                  placeholder={`Player ${index + 1} Mobile`}
                />
              </div>
            </div>
          ))}

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
