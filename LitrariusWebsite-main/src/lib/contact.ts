/**
 * Contact form submission helper.
 * 
 * TODO: Replace the simulated delay + resolve with your actual backend endpoint
 * (Formspree, EmailJS, own API, etc.). Export the function and import it in
 * the Contact component's handleSubmit.
 * 
 * For now this simulates a 1.2s network delay and resolves successfully.
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  message: string;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
}

/**
 * Simulated backend submission — 1.2s delay, then resolves ok.
 * 
 * Replace this with a real call (Formspree POST, EmailJS, own API, etc.).
 * The returned Promise never rejects in the stub; add rejection logic as needed.
 */
export async function submitContact(data: ContactFormData): Promise<SubmitResult> {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 1200));
  // Stub: always succeed for now
  return { success: true };
}

/** Falls back to a rejected result if you want early testing: */
/* export async function submitContact(data: ContactFormData): Promise<SubmitResult> {
  await new Promise((res) => setTimeout(res, 1200));
  return { success: true }; // TODO: plug real endpoint
} */