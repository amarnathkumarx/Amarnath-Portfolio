// src/components/Contact.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: "",
  });

  // Initialize EmailJS safely
  useEffect(() => {
    if (process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
    }
  }, []);

  /* ---------------- Validation ---------------- */

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      validateEmail(formData.email) &&
      formData.subject.trim().length >= 3 &&
      formData.message.trim().length >= 10 &&
      formData.message.length <= 500
    );
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    if (
      !process.env.REACT_APP_EMAILJS_SERVICE_ID ||
      !process.env.REACT_APP_EMAILJS_TEMPLATE_ID
    ) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: "Email service is not configured.",
      });
      return;
    }

    setFormStatus({
      submitting: true,
      submitted: false,
      error: false,
      message: "",
    });

    try {
      // Send message to admin
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      // Send auto reply to user (if template exists)
      if (process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID) {
        await emailjs.sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID,
          formRef.current,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );
      }

      setFormStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: "Message sent successfully! Check your email 😊",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, submitted: false }));
      }, 5000);
      
    } catch (err) {
      console.error("EmailJS Error:", err);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: "Failed to send message. Please try again later.",
      });

      // Auto-hide error message after 4 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, error: false }));
      }, 4000);
    }
  };

  /* ---------------- Contact Info ---------------- */

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "amarnathkumar22012004@gmail.com",
      link: "mailto:amarnathkumar22012004@gmail.com",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 9973576746",
      link: "tel:+919973576746",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "New Delhi, India",
      link: "#",
    },
  ];

  // Social links with hardcoded usernames (not from .env)
  const socialLinks = [
    {
      icon: FaGithub,
      url: "https://github.com/amarnathkumarx",
      username: "amarnathkumarx"
    },
    {
      icon: FaLinkedin,
      url: "https://linkedin.com/in/amarnathkumarx",
      username: "amarnathkumarx"
    },
    {
      icon: FaTwitter,
      url: "https://twitter.com/amarnathkumarx",
      username: "amarnathkumarx"
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-navy-darker relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-dark/50 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In{" "}
              <span className="bg-gradient-to-r from-electric-blue to-cyan-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-cyan-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </div>

          {/* Status Messages */}
          {formStatus.submitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-3 text-green-400"
            >
              <FaCheck className="flex-shrink-0" />
              <span>{formStatus.message}</span>
            </motion.div>
          )}

          {formStatus.error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3 text-red-400"
            >
              <FaTimes className="flex-shrink-0" />
              <span>{formStatus.message}</span>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target={info.link === "#" ? undefined : "_blank"}
                  rel={info.link === "#" ? undefined : "noopener noreferrer"}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="block bg-navy-light/30 p-5 rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <info.icon className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Social Links */}
              <div className="bg-navy-light/30 p-6 rounded-xl border border-electric-blue/20">
                <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-gray-400 mb-2">Connect with me on social media:</p>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-navy-dark rounded-lg flex items-center justify-center border border-transparent hover:border-electric-blue hover:text-electric-blue text-gray-400 transition-all duration-300"
                        title={`Follow me on ${social.icon.name.replace('Fa', '')}`}
                      >
                        <social.icon />
                      </motion.a>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    @{socialLinks[0].username} on all platforms
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-navy-light/30 p-8 rounded-2xl border border-electric-blue/20 backdrop-blur-sm"
              >
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-navy-dark border border-electric-blue/20 rounded-lg text-white outline-none focus:border-electric-blue transition-colors"
                      required
                    />
                    {formData.name && formData.name.length < 2 && (
                      <p className="text-xs text-red-400 mt-1">Name must be at least 2 characters</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-navy-dark border border-electric-blue/20 rounded-lg text-white outline-none focus:border-electric-blue transition-colors"
                      required
                    />
                    {formData.email && !validateEmail(formData.email) && (
                      <p className="text-xs text-red-400 mt-1">Please enter a valid email</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-navy-dark border border-electric-blue/20 rounded-lg text-white outline-none focus:border-electric-blue transition-colors"
                    required
                  />
                  {formData.subject && formData.subject.length < 3 && (
                    <p className="text-xs text-red-400 mt-1">Subject must be at least 3 characters</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    rows="4"
                    maxLength="500"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Your Message..."
                    className="w-full px-4 py-3 bg-navy-dark border border-electric-blue/20 rounded-lg text-white outline-none resize-none focus:border-electric-blue transition-colors"
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      {formData.message.length < 10 && formData.message.length > 0 ? (
                        <span className="text-red-400">Minimum 10 characters required</span>
                      ) : (
                        <span>Message length: {formData.message.length}/500</span>
                      )}
                    </p>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus.submitting || !isFormValid()}
                  whileHover={{ scale: formStatus.submitting || !isFormValid() ? 1 : 1.02 }}
                  whileTap={{ scale: formStatus.submitting || !isFormValid() ? 1 : 0.98 }}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-electric-blue to-cyan-500 rounded-lg font-semibold flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {formStatus.submitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;