// src/AboutUs.jsx
import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  const coreValues = [
    { icon: "🛡️", title: "Integrity", description: "in every deal" },
    { icon: "💡", title: "Innovation", description: "in event solutions" },
    { icon: "✅", title: "Fair opportunities", description: "for all" },
    { icon: "❤️", title: "Customer-first", description: "approach" },
    { icon: "🏢", title: "Building trust", description: "through transparency" }
  ];

  const uniqueFeatures = [
    { icon: "👥", title: "Students earn while gaining experience" },
    { icon: "🏪", title: "Vendors compete with transparent bidding" },
    { icon: "📅", title: "Event Managers handle A-to-Z contracts" },
    { icon: "⭐", title: "Rating & review system ensures trust" },
    { icon: "💳", title: "Secure in-platform payments" }
  ];

  const teamMembers = [
    { name: "Ashutosh Shivane", role: "Software Engineer", description: "Tech + Business Strategy", avatar: "AS" },
    { name: "Ashish", role: "Backend  Lead", description: "Building robust systems", avatar: "A" },
    { name: "Shubham", role: "Frontend & UX Lead", description: "Crafting user experiences", avatar: "S" }
  ];

  const achievements = [
    { icon: "🏆", text: "Selected in Startup Incubator/Competition" },
    { icon: "🤝", text: "Partnered with College/Corporate Partners" },
    { icon: "⭐", text: "500+ successful events powered" }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Transforming Event Management</h1>
        <p>
          We are a passionate team dedicated to transforming the way events are managed.
          Our platform connects students, organizers, vendors, and event managers in one place.
        </p>
        <p>
          We specialize in end-to-end event management solutions — from volunteer hiring
          to vendor bookings, contracts, and payments.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <div className="mission-grid">
          <div className="mission-card">👉 To empower students with real-world gigs and income opportunities.</div>
          <div className="mission-card">👉 To help organizers host seamless events.</div>
          <div className="mission-card">👉 To support vendors & managers in showcasing their services fairly and transparently.</div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="vision">
        <h2>Vision & Values</h2>
        <p>
          Vision: To become the most trusted and inclusive event management ecosystem that
          fuels creativity, opportunities, and excellence in events worldwide.
        </p>
        <div className="values-list">
          {coreValues.map((value, idx) => (
            <div key={idx} className="value-item">
              <span>{value.icon}</span>
              <span><strong>{value.title}</strong> {value.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="story">
        <h2>Our Story</h2>
        <p>
          Founded in 2025, our journey started with a simple idea:
          <strong> Events should create opportunities for everyone, not just big players.</strong>
          From small college fests to large corporate gatherings, we have grown by helping
          organizers connect with the right people and services.
        </p>
      </section>

      {/* Team */}
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((m, idx) => (
            <div key={idx} className="team-card">
              <div className="avatar">{m.avatar}</div>
              <h3>{m.name}</h3>
              <p className="role">{m.role}</p>
              <p>{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Unique Features */}
      <section className="features">
        <h2>What Makes Us Unique</h2>
        <div className="features-grid">
          {uniqueFeatures.map((f, idx) => (
            <div key={idx} className="feature-card">
              <p className="icon">{f.icon}</p>
              <p>✅ {f.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements">
        <h2>Achievements & Recognitions</h2>
        <div className="achievements-grid">
          {achievements.map((a, idx) => (
            <div key={idx} className="achievement-card">
              <p className="icon">{a.icon}</p>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Transform Your Events?</h2>
        <p>"Your event, your team, our platform."</p>
        <div className="cta-buttons">
          <button>📅 Create Your Event</button>
          <button>🏪 Join as Vendor</button>
          <button>👤 Sign up as Student Volunteer</button>
        </div>
      </section>

      {/* Contact */}
      <section className="contact">
        <h2>Get in Touch</h2>
        <div className="contact-box">
          <p>📧 support@eventapp.com</p>
          <p>We’d love to hear from you!</p>
        </div>
      </section>
    </div>
  );
}
