import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '177/A, 7th Cross Rd, 2nd Block, 2nd Stage\nNaagarabhavi, Bengaluru - 560072\nKarnataka, India' },
  { icon: Phone, label: 'Phone', value: '+91 8073104017\n+91 9980864573' },
  { icon: Mail, label: 'Email', value: 'contact@gruhahomes.com\nsupport@gruhahomes.com' },
  { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM\nSun: By Appointment' },
];

const serviceOptions = [
  'Residential Construction',
  'Architectural Design',
  'Interior Finishing',
  'Renovation & Remodeling',
  'Consultation',
  'Other',
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32" data-testid="contact-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div ref={ref} className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: '#F7E600' }}>
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Contact Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div key={i} className="flex gap-4" data-testid={`contact-info-${i}`}>
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(247,230,0,0.1)', border: '1px solid rgba(247,230,0,0.2)' }}>
                      <Icon size={20} color="#F7E600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: '#F7E600' }}>
                        {info.label}
                      </div>
                      <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--gruha-muted)' }}>
                        {info.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Google Map */}
            <div className="relative overflow-hidden aspect-[16/9]" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
              <iframe
                data-testid="google-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1234567890123!2d77.5127!3d12.9567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzI0LjEiTiA3N8KwMzAnNDUuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gruha Homes Location"
              />
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="p-8 md:p-10" style={{ backgroundColor: 'var(--gruha-elevated)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Send Us a Message
              </h3>
              <p className="text-sm mb-8" style={{ color: 'var(--gruha-muted)' }}>
                Fill in the details and our team will get back to you within 24 hours.
              </p>

              {sent ? (
                <motion.div
                  data-testid="contact-success"
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 size={48} color="#F7E600" className="mb-4" />
                  <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Message Sent!</h4>
                  <p className="text-sm" style={{ color: 'var(--gruha-muted)' }}>
                    Thank you for reaching out. We&apos;ll get back to you shortly.
                  </p>
                  <button
                    data-testid="send-another-message"
                    onClick={() => setSent(false)}
                    className="mt-6 px-6 py-2 text-sm font-bold uppercase tracking-wider"
                    style={{ backgroundColor: '#F7E600', color: '#000' }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="relative">
                      <input
                        data-testid="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 peer placeholder-transparent"
                        style={{
                          backgroundColor: 'var(--gruha-surface)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'var(--gruha-text)',
                        }}
                        placeholder="Your Name"
                        id="name"
                      />
                      <label htmlFor="name" className="absolute left-4 -top-2.5 text-xs px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs"
                        style={{ color: '#F7E600', backgroundColor: 'var(--gruha-elevated)' }}>
                        Your Name *
                      </label>
                    </div>
                    {/* Email */}
                    <div className="relative">
                      <input
                        data-testid="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 peer placeholder-transparent"
                        style={{
                          backgroundColor: 'var(--gruha-surface)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'var(--gruha-text)',
                        }}
                        placeholder="Your Email"
                        id="email"
                      />
                      <label htmlFor="email" className="absolute left-4 -top-2.5 text-xs px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs"
                        style={{ color: '#F7E600', backgroundColor: 'var(--gruha-elevated)' }}>
                        Your Email *
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="relative">
                      <input
                        data-testid="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 peer placeholder-transparent"
                        style={{
                          backgroundColor: 'var(--gruha-surface)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'var(--gruha-text)',
                        }}
                        placeholder="Phone"
                        id="phone"
                      />
                      <label htmlFor="phone" className="absolute left-4 -top-2.5 text-xs px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs"
                        style={{ color: '#F7E600', backgroundColor: 'var(--gruha-elevated)' }}>
                        Phone
                      </label>
                    </div>
                    {/* Service */}
                    <div className="relative">
                      <select
                        data-testid="contact-service"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 appearance-none cursor-pointer"
                        style={{
                          backgroundColor: 'var(--gruha-surface)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: form.service ? 'var(--gruha-text)' : 'var(--gruha-muted)',
                        }}
                      >
                        <option value="">Select Service</option>
                        {serviceOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      data-testid="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 resize-none peer placeholder-transparent"
                      style={{
                        backgroundColor: 'var(--gruha-surface)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'var(--gruha-text)',
                      }}
                      placeholder="Message"
                      id="message"
                    />
                    <label htmlFor="message" className="absolute left-4 -top-2.5 text-xs px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs"
                      style={{ color: '#F7E600', backgroundColor: 'var(--gruha-elevated)' }}>
                      Your Message *
                    </label>
                  </div>

                  {error && (
                    <p data-testid="contact-error" className="text-sm" style={{ color: '#EF4444' }}>{error}</p>
                  )}

                  <button
                    data-testid="contact-submit"
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                    style={{ backgroundColor: '#F7E600', color: '#000' }}
                  >
                    {sending ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
