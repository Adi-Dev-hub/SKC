import { useEffect, useState } from "react";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // -------------------------
    // Card hover animation
    // -------------------------
    const cardNodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".prize-card, .sponsor-card, .contact-card"
      )
    );
    const cardMouseEnterHandlers: Array<
      (this: HTMLElement, ev: Event) => void
    > = [];

    cardNodes.forEach((card) => {
      const handler = function (this: HTMLElement) {
        this.style.transition = "all 0.3s ease";
      };
      card.addEventListener("mouseenter", handler);
      cardMouseEnterHandlers.push(handler);
    });

    // -------------------------
    // File input logic
    // -------------------------
    const fileInputs = Array.from(
      document.querySelectorAll<HTMLInputElement>(".file-upload-input")
    );
    const fileChangeHandlers: Array<
      (this: HTMLInputElement, ev: Event) => void
    > = [];

    fileInputs.forEach((input) => {
      const handler = function (this: HTMLInputElement) {
        const fileName = this.files?.[0]
          ? this.files[0].name
          : "No file chosen";
        const fileLabel = this.parentElement?.parentElement?.querySelector(
          ".file-name"
        ) as HTMLElement | null;
        if (fileLabel) fileLabel.textContent = fileName;

        if (this.files?.[0] && this.files[0].size > 10 * 1024 * 1024) {
          alert("File size must be under 10MB");
          this.value = "";
          if (fileLabel) fileLabel.textContent = "No file chosen";
        }
      };
      input.addEventListener("change", handler);
      fileChangeHandlers.push(handler);
    });

    // -------------------------
    // Form submit logic
    // -------------------------
    const form = document.getElementById(
      "registrationForm"
    ) as HTMLFormElement | null;
    if (!form) return;

    const submitHandler = async (e: SubmitEvent) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbzFoPEBeJgps7h9TacLw8AiReU3RHFuOgHWPfp1SnTHVeWVaC98AiJwL7C99CID1JRp/exec",
          {
            method: "POST",
            body: formData,
          }
        );

        // ✅ Show success alert at top
        setSuccessMessage(
          "✅ Registration submitted successfully! We'll contact you soon."
        );

        form.reset();

        // Reset file names
        document.querySelectorAll(".file-name").forEach((el) => {
          el.textContent = "No file chosen";
        });

        // Hide the modal
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("registrationModal")!
        );
        modal?.hide();

        // Auto-hide success alert after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        alert("❌ Something went wrong. Please try again!");
        console.error(error);
      }
    };

    if (form) {
      form.addEventListener(
        "submit",
        submitHandler as unknown as EventListener
      );
    }
    // -------------------------
    // Cleanup on unmount
    // -------------------------
    return () => {
      cardNodes.forEach((card, i) =>
        card.removeEventListener("mouseenter", cardMouseEnterHandlers[i])
      );
      fileInputs.forEach((input, i) =>
        input.removeEventListener("change", fileChangeHandlers[i])
      );
      if (form)
        form.removeEventListener(
          "submit",
          submitHandler as unknown as EventListener
        );
    };
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <a
        href="#"
        className="fab"
        data-bs-toggle="modal"
        data-bs-target="#registrationModal"
        aria-label="Open registration"
      >
        <i className="fas fa-edit"></i>
      </a>

      {/* Header */}
      <header
        style={{
          padding: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Left Logo */}
          <div style={{ flexShrink: 0 }}>
            <img
              src="./ncrd-logo.png"
              alt="College Logo"
              style={{ width: "64px", height: "64px", objectFit: "contain" }}
            />
          </div>

          {/* Center Text */}
          <div style={{ textAlign: "center", flexGrow: 1 }}>
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "14px",
                letterSpacing: "1px",
                color: "black",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              NATIONAL CENTRE FOR RURAL DEVELOPMENT
            </p>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#184aa7",
                marginBottom: "4px",
                fontFamily: "serif, Georgia, 'Times New Roman', Times, serif",
              }}
            >
              Sterling Institute of Management Studies
            </h1>
            <p style={{ fontSize: "16px", color: "black", margin: 0 }}>
              NAAC Accredited A+ Grade
            </p>
          </div>

          {/* Right Logo */}
          <div style={{ flexShrink: 0 }}>
            <img
              src="./skc-logo.png"
              alt="Event Logo"
              style={{ width: "86px", height: "86px", objectFit: "contain" }}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="football" />
        <div className="football" />
        <div className="football" />

        <div className="container hero-content">
          <h1 className="display-3 fw-bold text-uppercase mb-3">
            Soccer Knockout Challenge 2025
          </h1>
          <div className="event-date">20, 21 & 22 December</div>
          <p className="lead mb-4">
            Showcase your football skills and compete for exciting prizes!
          </p>
          <button
            className="btn btn-warning btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#registrationModal"
            type="button"
          >
            Register Now
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center">
            <h2 className="text-center fw-bold section-title text-primary">
              About the Event
            </h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <p className="lead text-center mb-4">
                Get ready for the most thrilling soccer event of the year! The{" "}
                <strong className="text-accent">
                  Soccer Knockout Challenge (SKC) 2025
                </strong>{" "}
                brings together teams from across colleges for three days of
                high-energy matches, sportsmanship, and glory.
              </p>
              <div className="row mt-4">
                <div className="col-md-6 mb-3">
                  <div className="card h-100 border-0 shadow-sm prize-card">
                    <div className="card-body text-center">
                      <i className="fas fa-user-graduate fa-2x text-primary mb-3" />
                      <h5 className="card-title">Eligibility</h5>
                      <p className="card-text">
                        Students pursuing Graduation or Post-Graduation with a
                        valid College ID
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="card h-100 border-0 shadow-sm prize-card">
                    <div className="card-body text-center">
                      <i className="fas fa-ticket-alt fa-2x text-primary mb-3" />
                      <h5 className="card-title">Entry Fee</h5>
                      <p className="card-text">₹1,000 per team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-5 bg-dark text-white" id="highlights">
        <div className="container highlights-container">
          <div className="text-center">
            <h2 className="text-center fw-bold text-warning mb-5 display-4">
              Event Highlights
            </h2>
          </div>

          <div
            id="eventCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#eventCarousel"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#eventCarousel"
                data-bs-slide-to={1}
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#eventCarousel"
                data-bs-slide-to={2}
                aria-label="Slide 3"
              />
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1950&q=80"
                  className="d-block w-100"
                  alt="Football Match"
                />
                <div className="carousel-caption">
                  <h5 className="fw-bold text-warning">Thrilling Matches</h5>
                  <p>
                    Experience the energy of intense knockout football battles
                    with teams competing for glory!
                  </p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1950&q=80"
                  className="d-block w-100"
                  alt="Football Action"
                />
                <div className="carousel-caption">
                  <h5 className="fw-bold text-warning">Team Spirit</h5>
                  <p>
                    Colleges from all over come together for the ultimate
                    challenge and showcase their talent!
                  </p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1950&q=80"
                  className="d-block w-100"
                  alt="Football Celebration"
                />
                <div className="carousel-caption">
                  <h5 className="fw-bold text-warning">Victory Moments</h5>
                  <p>
                    Celebrate your wins and make unforgettable memories that
                    will last a lifetime!
                  </p>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#eventCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#eventCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center">
            <h2 className="text-center fw-bold section-title text-primary">
              Exciting Prizes
            </h2>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-3">
              <div className="card prize-card p-4 border-0 shadow text-center">
                <div className="card-body">
                  <i className="fas fa-trophy fa-3x text-warning mb-3" />
                  <h4 className="fw-bold text-primary">1st Prize</h4>
                  <h3 className="text-accent">₹30,000</h3>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card prize-card p-4 border-0 shadow text-center">
                <div className="card-body">
                  <i className="fas fa-medal fa-3x text-secondary mb-3" />
                  <h4 className="fw-bold text-primary">2nd Prize</h4>
                  <h3 className="text-accent">₹15,000</h3>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card prize-card p-4 border-0 shadow text-center">
                <div className="card-body">
                  <i className="fas fa-futbol fa-3x text-warning mb-3" />
                  <h5 className="fw-bold text-primary">Golden Boot</h5>
                  <h3 className="text-accent">₹5,000</h3>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card prize-card p-4 border-0 shadow text-center">
                <div className="card-body">
                  <i className="fas fa-hands fa-3x text-info mb-3" />
                  <h5 className="fw-bold text-primary">Golden Glove</h5>
                  <h3 className="text-accent">₹5,000</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-5" id="rules">
        <div className="container">
          <div className="text-center">
            <h2 className="text-center fw-bold section-title text-primary">
              Tournament Rules
            </h2>
          </div>

          <div className="rules-container">
            <div className="rules-header">
              <h3>
                <i className="fas fa-clipboard-list me-2" />
                Official SKC Rules
              </h3>
              <p className="mb-0">Follow the fair play spirit of the game!</p>
            </div>

            <div className="rules-list">
              <div className="rule-item">
                <div className="rule-title">
                  <span className="rule-number">1</span> Team Format
                </div>
                <div className="rule-content">
                  7 players + 3 substitutes per team; rolling substitutions
                  allowed.
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-title">
                  <span className="rule-number">2</span> Match Time
                </div>
                <div className="rule-content">
                  10-minute halves; in case of a tie → 3 penalties, then sudden
                  death.
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-title">
                  <span className="rule-number">3</span> Gameplay
                </div>
                <div className="rule-content">
                  No offside rule; goalkeepers can't throw beyond half line; no
                  slide tackling.
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-title">
                  <span className="rule-number">4</span> Discipline
                </div>
                <div className="rule-content">
                  Yellow → 3 mins out; Red → suspended for current & next match.
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-title">
                  <span className="rule-number">5</span> Conduct
                </div>
                <div className="rule-content">
                  Only captains may speak to referees. Misconduct → team
                  elimination.
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-title">
                  <span className="rule-number">6</span> Protests
                </div>
                <div className="rule-content">
                  Protest fee ₹1000; refundable only if protest is valid.
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-title">
                  <span className="rule-number">7</span> Referee Decision
                </div>
                <div className="rule-content">
                  Referee's decision is final and binding.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-5 bg-light" id="sponsors">
        <div className="container">
          <div className="text-center">
            <h2 className="text-center fw-bold section-title text-primary mb-5">
              Previous Sponsors
            </h2>
          </div>

          <div className="row justify-content-center g-4">
            <div className="col-6 col-md-3">
              <div className="sponsor-card card border-0 shadow-sm text-center p-3 h-100">
                <img
                  src="./red bull.png"
                  alt="Red Bull"
                  className="img-fluid mb-2 sponsor-logo"
                />
                <h6 className="fw-bold mt-2 text-secondary">Red Bull</h6>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="sponsor-card card border-0 shadow-sm text-center p-3 h-100">
                <img
                  src="./big cc.jpg"
                  alt="Big Cola"
                  className="img-fluid mb-2 sponsor-logo"
                />
                <h6 className="fw-bold mt-2 text-secondary">Big Cola</h6>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="sponsor-card card border-0 shadow-sm text-center p-3 h-100">
                <img
                  src="./CCD.png"
                  alt="CCD"
                  className="img-fluid mb-2 sponsor-logo"
                />
                <h6 className="fw-bold mt-2 text-secondary">Café Coffee Day</h6>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="sponsor-card card border-0 shadow-sm text-center p-3 h-100">
                <img
                  src="./spyker.png"
                  alt="Spykar"
                  className="img-fluid mb-2 sponsor-logo"
                />
                <h6 className="fw-bold mt-2 text-secondary">Spykar</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-5">
        <div className="container">
          <div className="text-center">
            <h2 className="text-center fw-bold section-title text-primary">
              Contact & Venue
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body">
                  <h4 className="card-title text-primary mb-4">
                    <i className="fas fa-map-marker-alt me-2" />
                    Venue
                  </h4>
                  <p className="card-text lead">
                    📍 Plot No. 93, Sector-19, Near Seawoods Railway Station,
                    Nerul (E), Navi Mumbai
                  </p>

                  <div className="map-container mt-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.895349458052!2d73.02083007466406!3d19.0243325535936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3b95117e193%3A0x223ef7aa6f1bb89c!2sNCRD&#39;s%20Sterling%20Institutes%2C%20Nerul%2C%20Navi%20Mumbai!5e0!3m2!1sen!2sin!4v1761581957027!5m2!1sen!2sin"
                      width="100%"
                      height={450}
                      style={{ border: 0, borderRadius: 12 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow h-100">
                <div className="card-body">
                  <h4 className="card-title text-primary mb-4">
                    <i className="fas fa-phone-alt me-2" />
                    Contact Organizers
                  </h4>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="contact-card text-center">
                        <h5 className="fw-bold">Aakash Pal</h5>
                        <a href="tel:8779156126" className="text-accent">
                          8779156126
                        </a>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="contact-card text-center">
                        <h5 className="fw-bold">Shivat Raina</h5>
                        <a href="tel:6006114944" className="text-accent">
                          6006114944
                        </a>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="contact-card text-center">
                        <h5 className="fw-bold">Kamlesh Borana</h5>
                        <a href="tel:9152547712" className="text-accent">
                          9152547712
                        </a>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="contact-card text-center">
                        <h5 className="fw-bold">Deven Patil</h5>
                        <a href="tel:9967985297" className="text-accent">
                          9967985297
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">
                &copy; 2025 NCRD Sterling Institute of Management Studies
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0">Designed for SKC Season 5 ⚽</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      <div
        className="modal fade"
        id="registrationModal"
        tabIndex={-1}
        aria-labelledby="registrationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold" id="registrationModalLabel">
                ⚽ Team Registration – Soccer Knockout Challenge 2025
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body p-4">
              <form id="registrationForm" encType="multipart/form-data">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold required-field">
                      Team Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="team_name"
                      placeholder="Enter team name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold required-field">
                      College Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="college_name"
                      placeholder="Enter college name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold required-field">
                      Captain Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="captain_name"
                      placeholder="Enter captain's full name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold required-field">
                      Captain Contact No.
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="captain_contact"
                      placeholder="e.g. 9876543210"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold required-field">
                      Alternate Contact No.
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="alternate_contact"
                      placeholder="e.g. 9876543210"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold required-field">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="e.g. captain@email.com"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold required-field">
                      Captain Aadhaar Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="captain_aadhaar"
                      placeholder="12-digit Aadhaar number"
                      pattern="[0-9]{12}"
                      maxLength={12}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <div className="file-upload-container">
                      <label className="file-upload-label required-field">
                        Upload Captain's Aadhaar Card
                      </label>
                      <div className="file-upload-wrapper">
                        <input
                          type="file"
                          className="file-upload-input"
                          name="captain_aadhaar_file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          required
                        />
                        <button type="button" className="file-upload-button">
                          <i className="fas fa-upload me-2" />
                          Choose File
                        </button>
                      </div>
                      <small className="file-name">No file chosen</small>
                      <small className="form-text text-muted d-block mt-1">
                        Accepted formats: JPG, PNG, PDF (Max 10MB)
                      </small>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-success px-5">
                      <i className="fas fa-paper-plane me-2" /> Submit
                      Registration
                    </button>
                  </div>
                </div>
              </form>

              {/* <div
                id="successMessage"
                className="alert alert-success mt-4 text-center d-none"
              >
                ✅ Registration submitted successfully! We'll contact you soon.
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
