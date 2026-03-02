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
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
      );

      setFormStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: "Message sent successfully! I’ll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, submitted: false }));
      }, 4000);
    } catch (err) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: "Failed to send message. Please try again later.",
      });

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

  const socialLinks = [
    {
      icon: FaGithub,
      url: `https://github.com/${
        process.env.REACT_APP_GITHUB_USERNAME || "amarnathkumarx"
      }`,
    },
    {
      icon: FaLinkedin,
      url: `https://linkedin.com/in/${
        process.env.REACT_APP_LINKEDIN_USERNAME || "amarnathkumarx"
      }`,
    },
    {
      icon: FaTwitter,
      url: `https://twitter.com/${
        process.env.REACT_APP_TWITTER_USERNAME || "amarnathkumarx"
      }`,
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-navy-darker relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>

          {/* Status Messages */}
          {formStatus.submitted && (
            <div className="max-w-xl mx-auto mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-3 text-green-400">
              <FaCheck />
              {formStatus.message}
            </div>
          )}

          {formStatus.error && (
            <div className="max-w-xl mx-auto mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3 text-red-400">
              <FaTimes />
              {formStatus.message}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="block bg-navy-light/30 p-5 rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-cyan-400 rounded-lg flex items-center justify-center">
                      <info.icon className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="bg-navy-light/30 p-6 rounded-xl border border-electric-blue/20">
                <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-navy-dark rounded-lg flex items-center justify-center border border-transparent hover:border-electric-blue hover:text-electric-blue text-gray-400 transition"
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-navy-light/30 p-8 rounded-2xl border border-electric-blue/20"
              >
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-navy-dark border border-electric-blue/20 rounded-lg text-white outline-none focus:border-electric-blue"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-navy-dark border border-electric-blue/20 rounded-lg text-white outline-none focus:border-electric-blue"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Subject"
                  className="w-full px-4 py-3 mb-6 bg-navy-dark border border-electric-blue/20 rounded-lg text-white outline-none focus:border-electric-blue"
                />

                <textarea
                  name="message"
                  rows="4"
                  maxLength="500"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Your Message..."
                  className="w-full px-4 py-3 bg-navy-dark border border-electric-blue/20 rounded-lg text-white outline-none resize-none focus:border-electric-blue"
                />

                <p className="text-right text-xs text-gray-500 mt-2">
                  {formData.message.length}/500
                </p>

                <button
                  type="submit"
                  disabled={formStatus.submitting || !isFormValid()}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-electric-blue to-cyan-500 rounded-lg font-semibold flex justify-center items-center gap-2 disabled:opacity-50"
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
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
