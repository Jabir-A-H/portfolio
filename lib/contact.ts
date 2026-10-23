// ============================================================================
// File: lib/contact.ts
// Purpose: Decoupled contact intake logic, validation, WhatsApp link generation,
//          and form submission handlers.
// ============================================================================

import { siteConfig } from '@/content/site';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  _gotcha: string;
}

export const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
  _gotcha: '',
};

export const BUDGET_OPTIONS = [
  { value: '< $5,000', label: '< $5,000' },
  { value: '$5,000 – $15,000', label: '$5,000 – $15,000' },
  { value: '$15,000 – $30,000', label: '$15,000 – $30,000' },
  { value: '$30,000+', label: '$30,000+' },
  { value: 'Undecided', label: 'Undecided' },
];

export const TIMELINE_OPTIONS = [
  { value: 'Urgent (< 1 month)', label: 'Urgent (< 1 month)' },
  { value: '1 – 3 months', label: '1 – 3 months' },
  { value: '3 – 6 months', label: '3 – 6 months' },
  { value: 'Flexible', label: 'Flexible' },
];

export type ValidationErrors = Partial<Record<keyof ContactFormData, string>>;

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Full name is required.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.service) {
    errors.service = 'Please select a service or choose General Inquiry.';
  }

  if (!data.budget) {
    errors.budget = 'Please select a budget range.';
  }

  if (!data.timeline) {
    errors.timeline = 'Please select a project timeline.';
  }

  if (!data.message.trim()) {
    errors.message = 'Project details / message is required.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Please provide at least 10 characters describing your project.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatWhatsAppUrl(customMessage?: string): string {
  const cleanDigits = (siteConfig.contact.whatsapp || '').replace(/[^0-9]/g, '');
  const text = encodeURIComponent(
    customMessage || `Hello ${siteConfig.name}, I would like to discuss a project inquiry.`
  );
  return `https://wa.me/${cleanDigits}?text=${text}`;
}

export async function submitInquiry(data: ContactFormData): Promise<{ success: boolean }> {
  // Spam Honeypot Handling:
  // If the hidden honeypot input contains content, sink the bot silently
  // without making any outbound network calls.
  if (data._gotcha) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  }

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  if (!endpoint) {
    // Fallback preview mode when form endpoint is not configured in env
    console.warn(
      '[ContactForm] NEXT_PUBLIC_FORM_ENDPOINT not set. Simulating realistic network submission in preview mode.'
    );
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company.trim(),
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      message: data.message.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Submission failed (HTTP status ${response.status})`);
  }

  return { success: true };
}
