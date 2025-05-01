// ContactForm.jsx
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you'd send data to a backend or third-party service
    alert("Form submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Name" required className="w-full border p-2" />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="w-full border p-2" />
        <input name="subject" onChange={handleChange} placeholder="Subject" required className="w-full border p-2" />
        <textarea name="message" onChange={handleChange} placeholder="Message" required className="w-full border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
