import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    teamName: '',
    captainName: '',
    phoneNumber: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(`Team registered!\nTeam: ${formData.teamName}\nCaptain: ${formData.captainName}\nPhone: ${formData.phoneNumber}`)
    setFormData({ teamName: '', captainName: '', phoneNumber: '' })
  }

  return (
    <div className="registration-container">
      <h1>Team Registration</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="teamName">Team Name</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
            placeholder="Enter team name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="captainName">Captain Name</label>
          <input
            type="text"
            id="captainName"
            name="captainName"
            value={formData.captainName}
            onChange={handleChange}
            required
            placeholder="Enter captain name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />
        </div>

        <button type="submit" className="submit-button">
          Register Team
        </button>
      </form>
    </div>
  )
}

export default App
