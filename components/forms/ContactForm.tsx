'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { getServiceOptionsForContact } from '@/content/queries';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import {
  type ContactFormData,
  type ValidationErrors,
  INITIAL_FORM_DATA,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  validateContactForm,
  formatWhatsAppUrl,
  submitInquiry,
} from '@/lib/contact';

export type { ContactFormData };

/**
 * Isolated query parameter reader wrapped in React.Suspense
 * to prevent de-opting static HTML generation of the Contact page.
 */
function ServiceSearchParamSync({
  onSelectService,
}: {
  onSelectService: (service: string) => void;
}) {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  React.useEffect(() => {
    if (serviceParam) {
      onSelectService(serviceParam);
    }
  }, [serviceParam, onSelectService]);

  return null;
}

export function ContactForm() {
  const [formData, setFormData] = React.useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  // Dropdown options with all 9 services + General Inquiry
  const serviceOptions = React.useMemo(() => getServiceOptionsForContact(), []);
  const whatsappHref = React.useMemo(() => formatWhatsAppUrl(), []);

  const handleSelectService = React.useCallback(
    (serviceSlug: string) => {
      if (serviceOptions.some((opt) => opt.value === serviceSlug)) {
        setFormData((prev) => ({ ...prev, service: serviceSlug }));
      }
    },
    [serviceOptions]
  );

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitInquiry(formData);
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
      <div role="status" aria-live="polite" className="w-full">
        <div className="flex items-start gap-3 border-t border-accent pt-5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <h3 className="font-display text-2xl text-foreground">Enquiry received.</h3>
            <p className="mt-2 max-w-[44ch] text-[14px] leading-relaxed text-muted-foreground">
              Thank you. We will read the brief and reply within two working days.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button type="button" variant="outline" size="md" onClick={handleReset}>
            Send another
          </Button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-foreground/30 pb-1 text-[13px] transition-colors hover:border-accent hover:text-accent"
          >
            Or message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <React.Suspense fallback={null}>
        <ServiceSearchParamSync onSelectService={handleSelectService} />
      </React.Suspense>

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
            className="flex items-start gap-3 border-l-2 border-red-600 py-1 pl-4 text-left"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <div className="flex-1 text-sm">
              <h4 className="font-medium text-foreground">The enquiry did not send.</h4>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                {errorMessage || 'Please check your details and try again, or email us directly.'}
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
            label="Name"
            placeholder="Your name"
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
            label="Email"
            placeholder="you@company.com"
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
            label="Company"
            placeholder="Optional"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
          />

          <Select
            id="service"
            name="service"
            label="Service"
            placeholder="Select a service"
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
            label="Budget"
            placeholder="Select a range"
            options={BUDGET_OPTIONS}
            value={formData.budget}
            onChange={handleChange}
            required
            error={errors.budget}
          />

          <Select
            id="timeline"
            name="timeline"
            label="Timeline"
            placeholder="Select a timeline"
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
          label="Project"
          placeholder="What are you building, and what is in the way?"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          error={errors.message}
        />

        <div className="flex flex-col items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={status === 'submitting'}
            className="w-full sm:w-auto"
          >
            {status === 'submitting' ? 'Sending' : 'Send enquiry'}
          </Button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-b border-foreground/30 pb-1 text-[13px] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Or message us on WhatsApp
          </a>
        </div>
      </form>
    </>
  );
}
