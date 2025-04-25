import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <select>
            <option value="general">General Inquiry</option>
            <option value="support">Support</option>
            <option value="feedback">Feedback</option>
          </select>
          <textarea rows="5" placeholder="Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className="contact-info">
        <h2>Contact Information</h2>
        <p><i className="icon">📍</i> <strong>Address:</strong> Baneshwor, Kathmandu, Nepal</p>
        <p><i className="icon">✉️</i> <strong>Email:</strong> info@farm2basket.com</p>
        <p><i className="icon">📞</i> <strong>Phone:</strong> +977-9840032269</p>

        <h3>Business Hours</h3>
          <div className="business-hours">
  <          span className="dot green"></span> Open now
         <div className="hours-time">10:00 am – 6:00 pm</div>
           </div>

      </div>
    </div>
  );
};

export default ContactUs;
