export interface Testimonial {
  quote: string;
  name: string;
  university: string;
  course: string;
  year: string;
  photo?: string;
}

/**
 * Testimonial data for the home page.
 * 
 * Entries with `"[Add a real student quote here]"` are placeholders.
 * The Testimonials section will only render when non-placeholder data exists.
 * In development (import.meta.env.DEV), placeholder entries will be rendered
 * with obviously marked text so the UI layout is preserved during development.
 */
export const testimonials: Testimonial[] = [
  {
    quote: '[Add a real student quote here]',
    name: '[Student First Name]',
    university: '[University Name]',
    course: '[Course Name]',
    year: '[Graduation Year]',
  },
  {
    quote: '[Add a real student quote here]',
    name: '[Student First Name]',
    university: '[University Name]',
    course: '[Course Name]',
    year: '[Graduation Year]',
  },
  {
    quote: '[Add a real student quote here]',
    name: '[Student First Name]',
    university: '[University Name]',
    course: '[Course Name]',
    year: '[Graduation Year]',
  },
];