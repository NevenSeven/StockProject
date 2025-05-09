import React, { useState } from 'react';
import './ContactPage.css'; // Optional external styling

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://stockstalker.vercel.app/api/contactBackend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const contentType = response.headers.get('content-type');
      const result = contentType && contentType.includes('application/json')
        ? await response.json()
        : null;
  
      if (response.ok) {
        alert('Message sent!');
        setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
      } else {
        alert(`Error: ${result?.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again later.');
    }
  };
  
  

  return (
    <div className="container my-5">
      <h6 className="text-primary fw-bold">Contact Us</h6>
      <h2 className="fw-bold mb-4">Let's Get in Touch.</h2>

      <div className="row contact-wrapper">
        {/* Contact Form */}
        <div className="col-md-8 p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <textarea
                  name="message"
                  placeholder="Message"
                  className="form-control"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-custom mt-2">Send Now</button>
              </div>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="col-md-4 contact-info d-flex flex-column justify-content-center">
          <h4>Contact Info</h4>
          <p className="mb-1">123 Street, City, State</p>
          <p className="mb-1">info@StockStalker.com</p>
          <p className="mb-1">1-234-567-890</p>
          <p>123-456-7890</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
