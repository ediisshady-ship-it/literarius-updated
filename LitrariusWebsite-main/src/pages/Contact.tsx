import React, { useState, useRef, useEffect, useId } from 'react';
import MiniCTABar from '../components/shared/MiniCTABar';
import RevealItem from '../components/shared/RevealItem';
import { submitContact } from '../lib/contact';
import { useReveal } from '../hooks/useReveal';

function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const firstInvalidRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Generate unique ids for each field
  const nameId = `contact-name-${useId()}`;
  const emailId = `contact-email-${useId()}`;
  const phoneId = `contact-phone-${useId()}`;
  const countryId = `contact-country-${useId()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: if the hidden field is filled, ignore submission
    const honeypot = formRef.current?.querySelector('input[type="text"]');
    if (honeypot && (honeypot as HTMLInputElement).value.length > 0) {
      return; // ignore
    }

    // Validate all fields
    const newErrors: Record<string, string> = {};

    // Name
    if (!('name' in newErrors)) {
      const nameInput = formRef.current?.elements.namedItem('name') as HTMLInputElement;
      if (!nameInput?.value.trim()) {
        newErrors.name = 'Required';
      }
    }

    // Email
    if (!('email' in newErrors)) {
      const emailInput = formRef.current?.elements.namedItem('email') as HTMLInputElement;
      const emailValue = emailInput?.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue) {
        newErrors.email = 'Required';
      } else if (!emailRegex.test(emailValue)) {
        newErrors.email = 'Invalid email address';
      }
    }

    // Phone
    if (!('phone' in newErrors)) {
      const phoneInput = formRef.current?.elements.namedItem('phone') as HTMLInputElement;
      const phoneValue = phoneInput?.value.trim();
      // Remove all non-digits, check at least 8 digits
      const digitsOnly = phoneValue.replace(/\D/g, '');
      if (!phoneValue) {
        newErrors.phone = 'Required';
      } else if (digitsOnly.length < 8) {
        newErrors.phone = 'Phone must contain at least 8 digits';
      }
    }

    // Message
    if (!('message' in newErrors)) {
      const messageTextarea = formRef.current?.elements.namedItem('message') as HTMLTextAreaElement;
      const messageValue = messageTextarea?.value.trim();
      if (!messageValue) {
        newErrors.message = 'Required';
      } else if (messageValue.length < 10) {
        newErrors.message = 'Message must be at least 10 characters';
      }
    }

    setErrors(newErrors);

    // If there are errors, focus the first invalid field and return early
    if (Object.keys(newErrors).length > 0) {
      // Focus first invalid field
      const firstKey = Object.keys(newErrors)[0];
      const firstInput = formRef.current?.elements.namedItem(firstKey) as HTMLElement;
      if (firstInput) {
        firstInput.focus();
      }
      return;
    }

    // All valid - submit
    const getValue = (name: string) => {
      const el = formRef.current?.elements.namedItem(name);
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        return el.value.trim();
      }
      if (el instanceof RadioNodeList) {
        return el.value.trim();
      }
      return '';
    };

    const formData = {
      name: getValue('name'),
      email: getValue('email'),
      phone: getValue('phone'),
      country: getValue('country'),
      service: getValue('service'),
      message: getValue('message'),
    };

    // Show loading state
    setErrors({}); // clear any previous errors

    submitContact(formData).then((result) => {
      if (result.success) {
        setSuccess(true);
        formRef.current?.reset();
        // Reset error state
        setErrors({});
      } else {
        setErrors({ _general: 'Submission failed. Please retry.' });
      }
    }).catch(() => {
      setErrors({ _general: 'Submission failed. Please retry.' });
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="w-full"
    >
      {/* Error summary at top */}
      {Object.keys(errors).length > 0 && (
        <div role="alert" className="mb-4 bg-white border-l-4 border-coral-aa rounded-t-xl p-4 shadow-sm">
          <p className="text-sm font-medium text-charcoal mb-2">Please correct the errors below:</p>
          <ul className="text-sm text-charcoal/90 space-y-1">
            {/* Map errors to anchor links that focus the field */}
            {Object.entries(errors).map(([key, message], i) => {
              const fieldId = key === 'name' ? nameId : key === 'email' ? emailId : key === 'phone' ? phoneId : countryId;
              return (
                <li key={i}>
                  <a
                    href={`#${fieldId}`}
                    className="underline underline-offset-2 hover:text-coral-aa"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      const target = document.getElementById(fieldId);
                      if (target) {
                        (target as HTMLElement).focus();
                      }
                    }}
                  >
                    {key === 'name' ? 'Name' : key === 'email' ? 'Email' : key === 'phone' ? 'Phone' : 'Country'}: {message}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Required hint above form */}
      <p className="text-xs text-muted-aa mb-4 block">
        Fields marked * are required
      </p>

      {/* Consent line */}
      <p className="text-xs text-muted-aa mb-6">
        By submitting you agree to be contacted about your enquiry.{' '}
        <a
          href="/privacy"
          className="font-poppins font-medium text-emerald-text underline underline-offset-2 hover:text-coral-aa"
          aria-label="Privacy Policy"
        >
          Privacy Policy
        </a>
        and
        <a
          href="/terms"
          className="font-poppins font-medium text-emerald-text underline underline-offset-2 hover:text-coral-aa"
          aria-label="Terms of Service"
        >
          Terms
        </a>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

        <div>
          <label htmlFor={nameId} className="block font-poppins font-bold text-xs uppercase tracking-widest text-charcoal/80 mb-3">
            Full Name <span className="inline-block ml-1 text-xs text-charcoal/60">*</span>
          </label>
          <input
            id={nameId}
            type="text"
            name="name"
            autoComplete="name"
            className="w-full bg-transparent border-b-2 border-charcoal/50 pb-3 text-charcoal placeholder-charcoal/55 focus:border-green-logo focus-visible:ring-2 focus-visible:ring-green-em/20 transition-colors"
            placeholder="John Smith"
            required
          />
          {errors.name && (
            <p
              id={`error-name`}
              className="mt-1 text-xs text-coral-500"
              aria-describedby={`error-name`}
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={emailId} className="block font-poppins font-bold text-xs uppercase tracking-widest text-charcoal/80 mb-3">
            Email Address <span className="inline-block ml-1 text-xs text-charcoal/60">*</span>
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            className="w-full bg-transparent border-b-2 border-charcoal/50 pb-3 text-charcoal placeholder-charcoal/55 focus:border-green-logo focus-visible:ring-2 focus-visible:ring-green-em/20 transition-colors"
            placeholder="john@example.com"
            required
          />
          {errors.email && (
            <p
              id={`error-email`}
              className="mt-1 text-xs text-coral-500"
              aria-describedby={`error-email`}
            >
              {errors.email}
            </p>
          )}
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

        <div>
          <label htmlFor={phoneId} className="block font-poppins font-bold text-xs uppercase tracking-widest text-charcoal/80 mb-3">
            Phone Number <span className="inline-block ml-1 text-xs text-charcoal/60">*</span>
          </label>
          <input
            id={phoneId}
            type="tel"
            name="phone"
            autoComplete="tel"
            className="w-full bg-transparent border-b-2 border-charcoal/50 pb-3 text-charcoal placeholder-charcoal/55 focus:border-green-logo focus-visible:ring-2 focus-visible:ring-green-em/20 transition-colors"
            placeholder="+61 4xx xxx xxx"
            required
            inputMode="tel"
          />
          {errors.phone && (
            <p
              id={`error-phone`}
              className="mt-1 text-xs text-coral-500"
              aria-describedby={`error-phone`}
            >
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={countryId} className="block font-poppins font-bold text-xs uppercase tracking-widest text-charcoal/80 mb-3">
            Country of Residence <span className="inline-block ml-1 text-xs text-charcoal/60">*</span>
          </label>
          <input
            id={countryId}
            type="text"
            name="country"
            autoComplete="country-name"
            className="w-full bg-transparent border-b-2 border-charcoal/50 pb-3 text-charcoal placeholder-charcoal/55 focus:border-green-logo focus-visible:ring-2 focus-visible:ring-green-em/20 transition-colors"
            placeholder="Your country"
            required
          />
          {errors.country && (
            <p
              id={`error-country`}
              className="mt-1 text-xs text-coral-500"
              aria-describedby={`error-country`}
            >
              {errors.country}
            </p>
          )}
        </div>

      </div>

      <div className="mb-8">
        <label htmlFor="service" className="block font-poppins font-bold text-xs uppercase tracking-widest text-charcoal/80 mb-3">
          Service Needed <span className="inline-block ml-1 text-xs text-charcoal/60">*</span>
          </label>
          <select
            id="service"
            name="service"
            className="w-full bg-transparent border-b-2 border-charcoal/50 pb-3 text-charcoal placeholder-charcoal/55 focus:border-green-logo focus-visible:ring-2 focus-visible:ring-green-em/20 transition-colors appearance-none"
            required
          >
            <option value="" disabled hidden>
              Select a service
            </option>
            <option value="University Admissions Counselling">University Admissions Counselling</option>
            <option value="Course & University Selection">Course & University Selection</option>
            <option value="Scholarship Guidance">Scholarship Guidance</option>
            <option value="Application Support">Application Support</option>
          </select>
          {errors.service && (
            <p
              id={`error-service`}
              className="mt-1 text-xs text-coral-500"
              aria-describedby={`error-service`}
            >
              {errors.service}
            </p>
          )}
        </div>

      <div className="mb-12">
        <label htmlFor="message" className="block font-poppins font-bold text-xs uppercase tracking-widest text-charcoal/80 mb-3">
          Your Message <span className="inline-block ml-1 text-xs text-charcoal/60">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full bg-transparent border-b-2 border-charcoal/50 pb-3 text-charcoal placeholder-charcoal/55 focus:border-green-logo focus-visible:ring-2 focus-visible:ring-green-em/20 transition-colors min-h-[100px] resize-y"
            placeholder="Tell us about your goals and how we can help..."
            required
          />
          {errors.message && (
            <p
              id={`error-message`}
              className="mt-1 text-xs text-coral-500"
              aria-describedby={`error-message`}
            >
              {errors.message}
            </p>
          )}
      </div>

      {/* Honeypot field - visually hidden, ignored by submission */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="absolute -left-9999 w-1 h-1 overflow-hidden bg-white opacity-0"
        />
      <button
        type="submit"
        className="bg-green-logo text-white font-poppins font-bold uppercase tracking-widest text-sm px-12 py-5 hover:bg-[#043326] transition-colors w-full md:w-auto"
        disabled={Object.keys(errors).length > 0 || success}
        aria-busy={success || Object.keys(errors).length > 0}
      >
        {Object.keys(errors).length > 0 || success ? 'Sending…' : 'Send Message'}
      </button>

      {success && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 font-medium text-sm text-green-em bg-emerald-50 px-4 py-3 rounded-md border border-emerald-100"
        >
          ✓ Thank you for reaching out. A member of our team will be in touch within 24 hours.
        </div>
      )}
    </form>
  );
}

export default function Contact() {
  const revealForm = useReveal();
  const revealInfo = useReveal();
  const revealTrust = useReveal();

  return (
    <div className="bg-cream-soft min-h-screen">
      {/* Minimal Header */}
      <section className="relative pt-32 pb-16 lg:pt-[120px] lg:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-contact.webp')] bg-cover bg-center mix-blend-overlay" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <RevealItem delay={0} type="fade-up">
            <span className="font-poppins uppercase tracking-widest text-green-em text-xs font-bold mb-4 block">Get in Touch</span>
            <h1 className="font-playfair text-[38px] md:text-[48px] lg:text-[64px] leading-[1] text-green-logo tracking-tight max-w-3xl">
              Let's start the<br /><span className="italic text-charcoal/80">conversation.</span>
            </h1>
          </RevealItem>
        </div>
      </section>

      {/* Main Split Content */}
      <section className="pb-32 px-6 max-w-[1400px] mx-auto border-b border-bdr">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left Form Panel */}
          <RevealItem type="slide-left" className="lg:col-span-7 lg:col-start-1">
            <ContactForm />
          </RevealItem>

          {/* Right Info Panel */}
          <RevealItem type="slide-right" className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12 lg:pt-4">

            <div className="rounded-xl overflow-hidden shadow-sm h-48 group">
              <img src="/images/student-group.webp" alt="Consultation" loading="lazy" decoding="async" width="560" height="333" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-cinematic-slow" />
            </div>

            <div className="flex flex-col gap-8">

              <div>
                <div className="eyebrow-tag">Phone</div>
                <a href="tel:+61459038427" className="font-playfair text-xl text-green-logo hover:text-emerald-text transition-colors block">+61 459 038 427</a>
              </div>

              <div>
                <div className="font-poppins font-bold text-[12px] text-charcoal/70 uppercase tracking-widest mb-2">Email</div>
                <a href="mailto:info@literarius.com.au" className="font-playfair text-xl text-green-logo hover:text-emerald-text transition-colors block">info@literarius.com.au</a>
              </div>

              <div>
                <div className="font-poppins font-bold text-[12px] text-charcoal/70 uppercase tracking-widest mb-2">Address</div>
                <div className="font-inter text-[15px] text-charcoal/80 leading-relaxed max-w-[250px]">
                  U 1 16, Campbell St.<br />Parramatta, NSW – 2150
                </div>
              </div>

              <div>
                <div className="font-poppins font-bold text-[12px] text-charcoal/70 uppercase tracking-widest mb-2">Hours</div>
                <div className="font-inter text-[15px] text-charcoal/80 leading-relaxed">
                  Monday–Saturday<br />9 AM – 6 PM AEST
                </div>
              </div>

              <div className="font-playfair italic text-green-logo text-[20px] leading-relaxed border-l-2 border-green-em pl-6 py-2 mt-8">
                "We have helped 1,000+ students begin their Australian journey. Yours could be next."
              </div>

              {/* Prefer WhatsApp? - only shown if phone number exists */}
              <div className="mt-4 pt-4 border-t border-bdr">
                <a
                  href="https://wa.me/61459038427"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-aa underline underline-offset-2 hover:text-coral-aa flex items-center gap-2"
                >
                  Prefer WhatsApp?
                </a>
              </div>

            </div>

          </RevealItem>

        </div>
      </section>

      {/* Trust Indicators — Pure Typography */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 text-center md:text-left">

            <RevealItem delay={0} type="fade-up" className="flex flex-col md:flex-row items-center gap-6">
              <div className="font-playfair italic text-[72px] lg:text-[100px] text-green-em leading-none">24h</div>
              <div className="font-poppins font-bold text-xs uppercase tracking-widest text-muted-aa md:max-w-[100px] leading-relaxed">
                Response<br/>Time
              </div>
            </RevealItem>

            <div className="hidden md:block w-px h-24 bg-bdr" />

            <RevealItem delay={200} type="fade-up" className="flex flex-col md:flex-row items-center gap-6">
              <div className="font-playfair italic text-[72px] lg:text-[100px] text-green-em leading-none">15+</div>
              <div className="font-poppins font-bold text-xs uppercase tracking-widest text-muted-aa md:max-w-[100px] leading-relaxed">
                Years<br/>Experience
              </div>
            </RevealItem>

            <div className="hidden md:block w-px h-24 bg-bdr" />

            <RevealItem delay={400} type="fade-up" className="flex flex-col md:flex-row items-center gap-6">
              <div className="font-playfair italic text-[72px] lg:text-[100px] text-green-em leading-none">Free</div>
              <div className="font-poppins font-bold text-xs uppercase tracking-widest text-muted-aa md:max-w-[100px] leading-relaxed">
                First<br/>Consultation
              </div>
            </RevealItem>

          </div>
        </div>
      </section>

      <MiniCTABar />
    </div>
  );
}