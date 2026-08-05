"use client";

import { useState } from "react";
import { User, Mail, PenSquare, MessageSquare } from "lucide-react";
import cn from "../../utils/cn";
import Button from "../../components/ui/Button";
import FadeRight from "../animations/FadeRight";

const INPUT_STYLES =
  "w-full rounded-full border border-transparent bg-bg dark:bg-bg-dark px-4 pr-12 py-3 text-sm text-heading/80 dark:text-text-dark/80 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-sky-300 dark:focus:border-gray-600";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  _subject: "", // Formspree uses this exact string key to override the email subject line
  message: "",
  honeyPot: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData._subject.trim()) {
      newErrors._subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (formData.honeyPot) {
      setStatus({ type: "success", text: "Message sent successfully!" });
      setFormData(INITIAL_FORM_STATE);
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
      if (!endpoint) {
        throw new Error("Form configuration missing.");
      }

      // Explicitly reconstruct the payload so the key sent to Formspree is exactly "_subject"
      const payload = {
        name: formData.name,
        email: formData.email,
        _subject: formData._subject, // Matches Formspree's reserved subject key
        message: formData.message,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error();

      setStatus({ type: "success", text: "Message sent successfully!" });
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    } catch {
      setStatus({
        type: "error",
        text: "Could not send your message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeRight>
      <section aria-labelledby="contact-form-heading" className="w-full">
        <div className="rounded-2xl bg-gray-200 p-4 dark:bg-[#222] sm:p-6">
          <h2
            id="contact-form-heading"
            className="mb-6 text-2xl font-semibold text-heading/80 dark:text-heading-dark/80"
          >
            Contact Form
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* Honeypot field for bot/spam prevention */}
            <div
              className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="honeyPot">Leave this field blank</label>
              <input
                id="honeyPot"
                name="honeyPot"
                type="text"
                tabIndex="-1"
                value={formData.honeyPot}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-heading/80 dark:text-heading-dark/80"
              >
                Full Name
              </label>

              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  className={INPUT_STYLES}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />

                <User
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-muted-dark"
                />
              </div>

              {errors.name && (
                <p
                  id="name-error"
                  className="text-sm text-red-500"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-heading/80 dark:text-heading-dark/80"
              >
                Email Address
              </label>

              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={INPUT_STYLES}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />

                <Mail
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-muted-dark"
                />
              </div>

              {errors.email && (
                <p
                  id="email-error"
                  className="text-sm text-red-500"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-heading/80 dark:text-heading-dark/80"
              >
                Subject
              </label>

              <div className="relative">
                <input
                  id="subject"
                  name="_subject"
                  type="text"
                  placeholder="How can we help you?"
                  value={formData._subject}
                  onChange={handleChange}
                  className={INPUT_STYLES}
                  aria-invalid={!!errors._subject}
                  aria-describedby={
                    errors._subject ? "subject-error" : undefined
                  }
                />

                <PenSquare
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-muted-dark"
                />
              </div>

              {errors._subject && (
                <p
                  id="subject-error"
                  className="text-sm text-red-500"
                  role="alert"
                >
                  {errors._subject}
                </p>
              )}
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-heading/80 dark:text-heading-dark/80"
              >
                Message
              </label>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell us more about your request..."
                  value={formData.message}
                  onChange={handleChange}
                  className={cn(INPUT_STYLES, "resize-none rounded-2xl pr-12")}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />

                <MessageSquare
                  size={18}
                  className="absolute right-4 top-4 text-text-muted dark:text-text-muted-dark"
                />
              </div>

              {errors.message && (
                <p
                  id="message-error"
                  className="text-sm text-red-500"
                  role="alert"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Error and Success Status Notifications */}
            {status.text && (
              <p
                className={cn(
                  "text-sm font-medium",
                  status.type === "success" ? "text-green-600" : "text-red-500",
                )}
                role="status"
              >
                {status.text}
              </p>
            )}

            <div>
              <Button
                label={loading ? "Sending..." : "Send Message"}
                type="submit"
                disabled={loading}
                className={cn(
                  "font-medium text-sm px-5 py-2.5",
                  loading && "opacity-50 cursor-not-allowed",
                )}
              />
            </div>
          </form>
        </div>
      </section>
    </FadeRight>
  );
}
