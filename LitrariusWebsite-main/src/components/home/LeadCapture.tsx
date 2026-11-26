import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitContact } from '../../lib/contact';
import { validateContactForm, type ValidationErrors } from '../../lib/validation';
import { site } from '../../data/site';

interface LeadCaptureProps {
  submitted?: boolean;
  onClose?: () => void;
}

export default function LeadCapture({
  submitted = false,
  onClose,
}: LeadCaptureProps) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle'
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContactForm({
      name,
      email,
      phone,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setFormState('error');
      return;
    }

    setFormState('submitting');
    try {
      const result = await submitContact({
        name,
        email,
        phone,
        country: 'AU',
        service: 'undergraduate',
        message: 'Free consultation request',
      });

      if (result.success) {
        setFormState('success');
        setName('');
        setEmail('');
        setPhone('');
        // Navigate to contact page after a moment
        setTimeout(() => navigate('/contact'), 3000);
      } else {
        setFormState('error');
        setErrors({ ...errors, generic: 'Submission failed. Please try again.' });
      }
    } catch (err) {
      setFormState('error');
      setErrors({ ...errors, generic: 'An error occurred. Please try again.' });
    }
  };

  // Click outside / close handler
  const handleClose = () => {
    setName('');
    setEmail('');
    setPhone('');
    setFormState('idle');
    setErrors({});
    onClose?.();
  };

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-content mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
          {/* Left: form */}
          <div>
            <h2 className="font-playfair text-[32px] md:text-[44px] text-green-logo mb-6 tracking-tight">
              Get in touch
            </h2>
            {submitted && formState === 'success' && (
              <p className="text-green-em text-sm mb-4">
                Thank you! We'll be in touch within 24 hours.
              </p>
            )}
            {submitted && formState === 'error' && (
              <p className="text-red-600 text-sm mb-4">Please check the errors above.</p>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="lead-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="lead-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Your full name"
                  required
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="lead-email" className="sr-only">
                  Email
                </label>
                <input
                  id="lead-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="lead-phone" className="sr-only">
                  Phone or WhatsApp
                </label>
                <input
                  id="lead-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  placeholder="+61 459 038 427 or your WhatsApp number"
                  required
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-coral w-full mt-4"
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? 'Sending...' : 'Book free consultation'}
              </button>
            </form>
          </div>

          {/* Right: summary / contact info */}
          <div className="space-y-4">
            <p className="text-sm text-muted-aa">
              Already have a question? Our consultants are standing by.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-emerald-text font-bold">{site.phone}</span>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Call now
              </a>
            </div>
            <p className="text-xs text-muted-aa/80">
              Your data is confidential and used only for admissions support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}