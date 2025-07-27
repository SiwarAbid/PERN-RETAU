import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import type { Restau } from '../../../types/accueil';
import axios from 'axios';
import { useMessageAlert } from '../../../hooks/useMessage';
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const { alert: alertMessage } = useMessageAlert();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const success = () => {
    alertMessage({typeMsg: 'success', messageContent: 'Message envoyé avec succès !'})  
  };

  const error = () => {
    alertMessage({typeMsg: 'error', messageContent: 'Un erreur se produit lors de l\'envoi du message.'})
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    await axios.post('http://localhost:5000/add-contact', formData).then(res => {
      console.log(res);
      success();
    }).catch(err => {
      console.log(err);
      error();
    })

  };

  // const contactInfo = [
  //   {
  //     icon: MapPin,
  //     title: "Adresse",
  //     details: ["123 Rue de la Gastronomie", "75001 Paris, France"],
  //     color: "text-blue-500"
  //   },
  //   {
  //     icon: Phone,
  //     title: "Téléphone",
  //     details: ["+33 1 23 45 67 89", "+33 6 12 34 56 78"],
  //     color: "text-green-500"
  //   },
  //   {
  //     icon: Mail,
  //     title: "Email",
  //     details: ["contact@sweetcorner.fr", "reservation@sweetcorner.fr"],
  //     color: "text-purple-500"
  //   },
  //   {
  //     icon: Clock,
  //     title: "Horaires",
  //     details: ["Lun-Ven: 11:30 - 23:00", "Sam-Dim: 12:00 - 00:00"],
  //     color: "text-orange-500"
  //   }
  // ];

  const { isDark } = useTheme();
  const restau: Restau = localStorage.getItem('restaurant') ? JSON.parse(localStorage.getItem('restaurant') as string) : {};


  return (
      <section id="contact" className={`py-20 px-4 transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-amber-950 via-orange-950 to-red-950' 
          : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'
        }`}
        >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className={"about-intro-text"}>
              Restons en contact
            </span>
          </div>
          <h2 className={"about-title"}>
            <span className={"about-title-accent"}>
              Contactez
            </span> Nous
          </h2>
          <p className={"about-description"}>
            Une question, une réservation ou simplement envie de nous dire bonjour ? 
            Nous sommes là pour vous écouter !
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className={`p-8 rounded-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-amber-900/30 border border-amber-700/30' 
                : 'bg-white/70 border border-orange-200/50 shadow-xl'
            }`}>
              <h2 className={`text-2xl font-light mb-8 transition-colors duration-300 ${
                isDark ? 'text-amber-100' : 'text-amber-900'
              }`}>
                Informations
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    isDark ? 'bg-amber-700/50' : 'bg-orange-100'
                  }`}>
                    <MapPin className={`w-5 h-5 transition-colors duration-300 ${
                      isDark ? 'text-amber-300' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 transition-colors duration-300 ${
                      isDark ? 'text-amber-200' : 'text-amber-800'
                    }`}>
                      Adresse
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDark ? 'text-amber-300' : 'text-amber-600'
                    }`}>
                      {restau ? restau.address : "123 Rue de la Liberté 1000 Tunis, Tunisie"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    isDark ? 'bg-amber-700/50' : 'bg-orange-100'
                  }`}>
                    <Phone className={`w-5 h-5 transition-colors duration-300 ${
                      isDark ? 'text-amber-300' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 transition-colors duration-300 ${
                      isDark ? 'text-amber-200' : 'text-amber-800'
                    }`}>
                      Réservations
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDark ? 'text-amber-300' : 'text-amber-600'
                    }`}>
                      {restau ? restau.phone : '+216 99 888 777' }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    isDark ? 'bg-amber-700/50' : 'bg-orange-100'
                  }`}>
                    <Mail className={`w-5 h-5 transition-colors duration-300 ${
                      isDark ? 'text-amber-300' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 transition-colors duration-300 ${
                      isDark ? 'text-amber-200' : 'text-amber-800'
                    }`}>
                      Email
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDark ? 'text-amber-300' : 'text-amber-600'
                    }`}>
                      {restau ? restau.email : "contact@sweetcorner.tn"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    isDark ? 'bg-amber-700/50' : 'bg-orange-100'
                  }`}>
                    <Clock className={`w-5 h-5 transition-colors duration-300 ${
                      isDark ? 'text-amber-300' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 transition-colors duration-300 ${
                      isDark ? 'text-amber-200' : 'text-amber-800'
                    }`}>
                      Horaires
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDark ? 'text-amber-300' : 'text-amber-600'
                    }`}>
                      Lundi - Jeudi<br />
                      7h30 - 23h00<br />
                      <br/>
                      Samedi - Dimanche<br />
                      7h00 - 00h00<br />
                      <br/>
                      <span className="italic">Fermé le Vendredi</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className={`p-8 rounded-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-amber-900/30 border border-amber-700/30' 
                : 'bg-white/70 border border-orange-200/50 shadow-xl'
            }`}>
              <h3 className={`text-2xl font-light mb-8 transition-colors duration-300 ${
                isDark ? 'text-amber-100' : 'text-amber-900'
              }`}>
                Envoyez-nous un Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                      isDark ? 'text-amber-200' : 'text-amber-800'
                    }`}>
                      <User className="w-4 h-4" />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                        isDark 
                          ? 'bg-amber-800/30 border-amber-700/50 text-amber-100 placeholder-amber-400 focus:ring-amber-500 focus:border-amber-500' 
                          : 'bg-white/80 border-orange-200 text-amber-900 placeholder-amber-500 focus:ring-orange-500 focus:border-orange-500'
                      }`}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                      isDark ? 'text-amber-200' : 'text-amber-800'
                    }`}>
                      <Mail className="w-4 h-4" />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                        isDark 
                          ? 'bg-amber-800/30 border-amber-700/50 text-amber-100 placeholder-amber-400 focus:ring-amber-500 focus:border-amber-500' 
                          : 'bg-white/80 border-orange-200 text-amber-900 placeholder-amber-500 focus:ring-orange-500 focus:border-orange-500'
                      }`}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                      isDark ? 'text-amber-200' : 'text-amber-800'
                    }`}>
                      <Phone className="w-4 h-4" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                        isDark 
                          ? 'bg-amber-800/30 border-amber-700/50 text-amber-100 placeholder-amber-400 focus:ring-amber-500 focus:border-amber-500' 
                          : 'bg-white/80 border-orange-200 text-amber-900 placeholder-amber-500 focus:ring-orange-500 focus:border-orange-500'
                      }`}
                      placeholder="+216 99 888 777"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                      isDark ? 'text-amber-200' : 'text-amber-800'
                    }`}>
                      <MessageSquare className="w-4 h-4" />
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                        isDark 
                          ? 'bg-amber-800/30 border-amber-700/50 text-amber-100 focus:ring-amber-500 focus:border-amber-500' 
                          : 'bg-white/80 border-orange-200 text-amber-900 focus:ring-orange-500 focus:border-orange-500'
                      }`}
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

                <div className="space-y-2">
                  <label htmlFor="message" className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                    isDark ? 'text-amber-200' : 'text-amber-800'
                  }`}>
                    <MessageSquare className="w-4 h-4" />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                      isDark 
                        ? 'bg-amber-800/30 border-amber-700/50 text-amber-100 placeholder-amber-400 focus:ring-amber-500 focus:border-amber-500' 
                        : 'bg-white/80 border-orange-200 text-amber-900 placeholder-amber-500 focus:ring-orange-500 focus:border-orange-500'
                    }`}
                    placeholder="Votre message..."
                    rows={5}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                    isDark 
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl focus:ring-amber-500/50' 
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl focus:ring-orange-500/50'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  <span>Envoyer le Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;