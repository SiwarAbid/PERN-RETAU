import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Form submitted:', formData);
    alert('Message envoyé avec succès !');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: ["123 Rue de la Gastronomie", "75001 Paris, France"],
      color: "text-blue-500"
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+33 1 23 45 67 89", "+33 6 12 34 56 78"],
      color: "text-green-500"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@sweetcorner.fr", "reservation@sweetcorner.fr"],
      color: "text-purple-500"
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun-Ven: 11:30 - 23:00", "Sam-Dim: 12:00 - 00:00"],
      color: "text-orange-500"
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="contact-header">
          <div className="contact-intro">
            <span className="contact-intro-text">Restons en contact</span>
          </div>
          <h2 className="contact-title">
            <span className="contact-title-accent">Contactez</span> Nous
          </h2>
          <p className="contact-description">
            Une question, une réservation ou simplement envie de nous dire bonjour ? 
            Nous sommes là pour vous écouter !
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h3 className="contact-info-title">Informations de Contact</h3>
            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className={`contact-card contact-${index + 1}`}>
                  <div className="contact-icon">
                    <info.icon className="icon-lg" />
                  </div>
                  <div className="contact-details">
                    <h4 className="contact-card-title">{info.title}</h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="contact-detail">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="map-container">
              <div className="map-placeholder">
                <MapPin className="map-icon" />
                <p className="map-text">Carte interactive disponible bientôt</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h3 className="form-title">Envoyez-nous un Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <User className="label-icon" />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail className="label-icon" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <Phone className="label-icon" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    <MessageSquare className="label-icon" />
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="reservation">Réservation</option>
                    <option value="information">Information</option>
                    <option value="event">Événement privé</option>
                    <option value="feedback">Commentaire</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <MessageSquare className="label-icon" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Votre message..."
                  rows={5}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <Send className="btn-icon" />
                <span>Envoyer le Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;