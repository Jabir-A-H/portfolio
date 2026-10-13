'use client';

import * as React from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  RotateCcw,
} from 'lucide-react';
import { siteConfig } from '@/content/site';
import { services } from '@/content/services';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

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

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
  _gotcha: '',
};

const BUDGET_OPTIONS = [
  { value: '< $5,000', label: '< $5,000' },
  { value: '$5,000 – $15,000', label: '$5,000 – $15,000' },
  { value: '$15,000 – $30,000', label: '$15,000 – $30,000' },
  { value: '$30,000+', label: '$30,000+' },
  { value: 'Undecided', label: 'Undecided' },
];

const TIMELINE_OPTIONS = [
  { value: 'Urgent (< 1 month)', label: 'Urgent (< 1 month)' },
  { value: '1 – 3 months', label: '1 – 3 months' },
  { value: '3 – 6 months', label: '3 – 6 months' },
  { value: 'Flexible', label: 'Flexible' },
];

export function ContactForm() {
  const [formData, setFormData] = React.useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  // Dropdown options with all 9 services + General Inquiry
  const serviceOptions = React.useMemo(() => {
    return [
      { value: 'general-inquiry', label: 'General Inquiry' },
      ...services.map((s) => ({
        value: s.slug,
        label: s.title,
      })),
    ];
  }, []);

  const cleanWhatsAppDigits = React.useMemo(() => {
    return (siteConfig.contact.whatsapp || '').replace(/[^0-9]/g, '');
  }, []);

  const whatsappHref = React.useMemo(() => {
    const text = encodeURIComponent(
      `Hello ${siteConfig.name}, I would like to discuss a project inquiry.`
    );
    return `https://wa.me/${cleanWhatsAppDigits}?text=${text}`;
  }, [cleanWhatsAppDigits]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific validation error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ContactFormData];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service or choose General Inquiry.';
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range.';
    }

    if (!formData.timeline) {
      newErrors.timeline = 'Please select a project timeline.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project details / message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters describing your project.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Spam Honeypot Handling:
    // If the hidden honeypot input contains content, sink the bot silently
    // without making any outbound network calls.
    if (formData._gotcha) {
      setTimeout(() => {
        setStatus('success');
      }, 500);
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    try {
      if (!endpoint) {
        // Fallback preview mode when form endpoint is not configured in env
        console.warn(
          '[ContactForm] NEXT_PUBLIC_FORM_ENDPOINT not set. Simulating realistic network submission in preview mode.'
        );
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStatus('success');
        return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          service: formData.service,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed (HTTP status ${response.status})`);
      }

      setStatus('success');
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to deliver your inquiry. Please try again or reach out directly.';
      setErrorMessage(message);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 sm:p-10 text-center animate-fade-in"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          Inquiry Successfully Sent!
        </h3>

        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. We have received your project details and our engineering team will get back to you within 24 business hours.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Send Another Inquiry
          </Button>

          <Button
            href={whatsappHref}
            target="_blank"
            variant="accent"
            size="md"
            leftIcon={<MessageSquare className="w-4 h-4" />}
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full flex flex-col space-y-6"
    >
      {/* Honeypot anti-spam field (visually hidden & inaccessible to genuine users) */}
      <div
        className="opacity-0 absolute pointer-events-none -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
        tabIndex={-1}
      >
        <label htmlFor="_gotcha">Do not fill this field</label>
        <input
          id="_gotcha"
          type="text"
          name="_gotcha"
          value={formData._gotcha}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {/* Submission Error Banner (preserves user state for effortless retry) */}
      {status === 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 sm:p-5 flex items-start gap-3.5 text-left"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm">
            <h4 className="font-semibold text-red-950 dark:text-red-100">
              Inquiry Submission Error
            </h4>
            <p className="mt-1 text-red-800 dark:text-red-200">
              {errorMessage || 'There was a problem sending your message. Please verify your details or use WhatsApp/email below.'}
            </p>
          </div>
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Input
          id="name"
          name="name"
          type="text"
          label="Full Name *"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
          autoComplete="name"
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address *"
          placeholder="jane@company.com"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
          autoComplete="email"
        />
      </div>

      {/* Company Name & Service Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Input
          id="company"
          name="company"
          type="text"
          label="Company / Organization"
          placeholder="Acme Enterprises (optional)"
          value={formData.company}
          onChange={handleChange}
          autoComplete="organization"
        />

        <Select
          id="service"
          name="service"
          label="Service Interested In *"
          placeholder="Select Service"
          options={serviceOptions}
          value={formData.service}
          onChange={handleChange}
          required
          error={errors.service}
        />
      </div>

      {/* Budget Range & Project Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Select
          id="budget"
          name="budget"
          label="Estimated Budget Range *"
          placeholder="Select Budget Range"
          options={BUDGET_OPTIONS}
          value={formData.budget}
          onChange={handleChange}
          required
          error={errors.budget}
        />

        <Select
          id="timeline"
          name="timeline"
          label="Desired Timeline *"
          placeholder="Select Project Timeline"
          options={TIMELINE_OPTIONS}
          value={formData.timeline}
          onChange={handleChange}
          required
          error={errors.timeline}
        />
      </div>

      {/* Project Details Textarea */}
      <Textarea
        id="message"
        name="message"
        label="Project Details & Requirements *"
        placeholder="Briefly describe your objectives, key technical requirements, existing platforms, or desired deliverables..."
        rows={5}
        value={formData.message}
        onChange={handleChange}
        required
        error={errors.message}
      />

      {/* Action Footer: Submit Button + WhatsApp Direct Secondary Action */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          isLoading={status === 'submitting'}
          rightIcon={<Send className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          {status === 'submitting' ? 'Transmitting Inquiry...' : 'Submit Project Inquiry'}
        </Button>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface text-sm font-medium text-foreground hover:bg-muted/80 hover:border-emerald-500/50 transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </form>
  );
}
