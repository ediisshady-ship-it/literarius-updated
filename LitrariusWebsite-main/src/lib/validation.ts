/**
 * Shared validation functions used by the contact form and lead capture.
 * Keeps validation logic in one place so both components stay consistent.
 */

export interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: string | undefined;
}

/**
 * Validate that a name is provided and not just whitespace.
 */
export function validateName(name: string | undefined): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!name || name.trim().length === 0) {
    errors.name = 'Please enter your full name';
  }
  return errors;
}

/**
 * Validate that an email address has a valid format.
 */
export function validateEmail(email: string | undefined): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!email || email.trim().length === 0) {
    errors.email = 'Please enter your email address';
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    errors.email = 'Please enter a valid email address';
  }
  return errors;
}

/**
 * Validate that a phone number is provided and contains only digits,
 * spaces, plus, and parentheses.
 */
export function validatePhone(phone: string | undefined): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!phone || phone.trim().length === 0) {
    errors.phone = 'Please enter your phone number or WhatsApp number';
  } else if (!/^[+\d\s()-]+$/.test(phone.trim())) {
    errors.phone = 'Please enter a valid phone number';
  } else if (phone.trim().replace(/\D/g, '').length < 7) {
    errors.phone = 'Phone number is too short';
  }
  return errors;
}

/**
 * Validate the full contact form data.
 * Returns an errors object with field names as keys.
 * Empty object means validation passed.
 */
export function validateContactForm(
  data: {
    name: string;
    email: string;
    phone: string;
  }
): ValidationErrors {
  const errors: ValidationErrors = {};
  const nameErrors = validateName(data.name);
  const emailErrors = validateEmail(data.email);
  const phoneErrors = validatePhone(data.phone);

  Object.assign(errors, nameErrors, emailErrors, phoneErrors);
  return errors;
}