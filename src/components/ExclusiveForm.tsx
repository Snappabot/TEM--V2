import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  spaceType: string;
  feeling: string;
  designerName: string;
  timeline: string;
  investment: string;
  files: File[];
  notes: string;
}

const SPACE_TYPES = ['Home', 'Commercial', 'Hospitality', 'Developer', 'Other'];
const TIMELINES = ['Within 3 months', '3–6 months', '6–12 months', 'Planning stage'];
const INVESTMENTS = ['$5,000–$15,000', '$15,000–$50,000', '$50,000+', 'Prefer not to say'];

const STEP_TITLES = [
  'Tell us about yourself',
  'Tell us about your project',
  'Your vision',
  'Review & Submit',
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

function RadioTile({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-5 py-3 rounded text-sm font-medium tracking-wide transition-all duration-200 text-left"
      style={{
        background: selected ? 'rgba(139,115,85,0.12)' : '#111',
        border: `1px solid ${selected ? '#8b7355' : 'rgba(255,255,255,0.1)'}`,
        color: selected ? '#c9aa82' : 'rgba(255,255,255,0.7)',
        boxShadow: selected ? '0 0 0 1px #8b7355' : 'none',
      }}
    >
      {label}
    </button>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = '',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '4px' }}>
      <label style={{ color: 'rgba(139,115,85,0.9)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>
        {label}{required && <span style={{ color: '#8b7355', marginLeft: '4px' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          display: 'block',
          width: '100%',
          padding: '14px 16px',
          background: '#111',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          color: 'white',
          fontSize: '0.95rem',
          outline: 'none',
        }}
        onFocus={e => { e.target.style.borderColor = '#8b7355'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      />
    </div>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
  required = false,
  placeholder = '',
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs tracking-widest uppercase" style={{ color: 'rgba(139,115,85,0.9)' }}>
        {label}{required && <span className="ml-1" style={{ color: '#8b7355' }}>*</span>}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded text-white text-sm outline-none resize-none transition-all duration-200"
        style={{
          background: '#111',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onFocus={e => { e.target.style.borderColor = '#8b7355'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
      />
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span className="text-xs tracking-widest uppercase" style={{ color: '#8b7355' }}>{label}</span>
      <span className="text-white text-sm leading-relaxed">{value}</span>
    </div>
  );
}

function SuccessState({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-lg mx-auto">
        <div className="mb-8" style={{ color: '#8b7355' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto">
            <circle cx="24" cy="24" r="23" stroke="#8b7355" strokeWidth="1" />
            <path d="M14 24l7 7 13-13" stroke="#8b7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#8b7355' }}>
          Application Received
        </p>
        <h2
          className="mb-6 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 600 }}
        >
          Thank you, {name.split(' ')[0]}.
        </h2>
        <p className="mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: '38ch', margin: '0 auto 3rem' }}>
          We review all applications personally. If your project is the right fit for an exclusive commission, we will be in touch within 5 business days.
        </p>
        <a
          href="/"
          className="text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ color: '#8b7355' }}
          onMouseEnter={e => { (e.target as HTMLElement).style.color = '#c9aa82'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.color = '#8b7355'; }}
        >
          ← Return to Troweled Earth
        </a>
      </div>
    </motion.div>
  );
}

export default function ExclusiveForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ApplicationData>({
    fullName: '',
    email: '',
    phone: '',
    spaceType: '',
    feeling: '',
    designerName: '',
    timeline: '',
    investment: '',
    files: [],
    notes: '',
  });

  const update = (field: keyof ApplicationData, value: ApplicationData[keyof ApplicationData]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const goNext = () => { setDirection(1); setStep(s => s + 1); };
  const goPrev = () => { setDirection(-1); setStep(s => s - 1); };

  const canProceed = () => {
    if (step === 1) return form.fullName.trim() && form.email.trim() && form.email.includes('@');
    if (step === 2) return form.spaceType && form.feeling.trim();
    if (step === 3) return form.timeline && form.investment;
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      update('files', Array.from(e.target.files).slice(0, 5) as unknown as ApplicationData['files']);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const fd = new FormData();
      fd.append('fullName', form.fullName);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('spaceType', form.spaceType);
      fd.append('feeling', form.feeling);
      fd.append('designerName', form.designerName);
      fd.append('timeline', form.timeline);
      fd.append('investment', form.investment);
      fd.append('notes', form.notes);
      (form.files as unknown as File[]).forEach(f => fd.append('images', f));

      const res = await fetch('/api/exclusive', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Failed to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) return <SuccessState name={form.fullName} />;

  return (
    <section
      id="application"
      className="relative w-full"
      style={{ background: '#0a0a0a', padding: 'clamp(1.5rem, 6vw, 6rem) 0 clamp(2rem, 8vw, 6rem)' }}
    >
      <div className="max-w-2xl mx-auto px-8 md:px-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className="rounded-full transition-all duration-300"
              style={{
                width: s === step ? '24px' : '8px',
                height: '8px',
                background: s === step ? '#8b7355' : s < step ? 'rgba(139,115,85,0.5)' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        {/* Step label */}
        <p className="text-center text-xs tracking-widest uppercase mb-2" style={{ color: '#8b7355' }}>
          Step {step} of 4
        </p>
        <h2
          className="text-center mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: 'white',
            fontWeight: 500,
          }}
        >
          {STEP_TITLES[step - 1]}
        </h2>

        {/* Step content */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  <FieldInput
                    label="Full Name"
                    value={form.fullName}
                    onChange={v => update('fullName', v)}
                    required
                  />
                  <FieldInput
                    label="Email Address"
                    value={form.email}
                    onChange={v => update('email', v)}
                    type="email"
                    required
                  />
                  <FieldInput
                    label="Phone Number"
                    value={form.phone}
                    onChange={v => update('phone', v)}
                    type="tel"
                    placeholder="Optional"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-xs tracking-widest uppercase" style={{ color: 'rgba(139,115,85,0.9)' }}>
                      Space Type <span style={{ color: '#8b7355' }}>*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SPACE_TYPES.map(t => (
                        <RadioTile
                          key={t}
                          label={t}
                          selected={form.spaceType === t}
                          onClick={() => update('spaceType', t)}
                        />
                      ))}
                    </div>
                  </div>

                  <FieldTextarea
                    label="Describe the feeling you want this finish to create"
                    value={form.feeling}
                    onChange={v => update('feeling', v)}
                    required
                    placeholder="e.g. Warm, textured, like touching ancient stone…"
                    rows={5}
                  />

                  <FieldInput
                    label="Architect or Designer on the project"
                    value={form.designerName}
                    onChange={v => update('designerName', v)}
                    placeholder="Leave blank if not applicable"
                  />
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-xs tracking-widest uppercase" style={{ color: 'rgba(139,115,85,0.9)' }}>
                      Timeline <span style={{ color: '#8b7355' }}>*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINES.map(t => (
                        <RadioTile
                          key={t}
                          label={t}
                          selected={form.timeline === t}
                          onClick={() => update('timeline', t)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs tracking-widest uppercase" style={{ color: 'rgba(139,115,85,0.9)' }}>
                      Investment Level <span style={{ color: '#8b7355' }}>*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INVESTMENTS.map(t => (
                        <RadioTile
                          key={t}
                          label={t}
                          selected={form.investment === t}
                          onClick={() => update('investment', t)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs tracking-widest uppercase" style={{ color: 'rgba(139,115,85,0.9)' }}>
                      Reference Images
                      <span className="ml-2 normal-case tracking-normal text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        (up to 5 files — jpg, png, pdf)
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 px-5 rounded text-sm transition-all duration-200 text-left"
                      style={{
                        background: '#111',
                        border: '1px dashed rgba(139,115,85,0.4)',
                        color: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {(form.files as unknown as File[]).length > 0
                        ? `${(form.files as unknown as File[]).length} file${(form.files as unknown as File[]).length > 1 ? 's' : ''} selected`
                        : '+ Add reference images'}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {(form.files as unknown as File[]).length > 0 && (
                      <ul className="flex flex-col gap-1.5 mt-1">
                        {(form.files as unknown as File[]).map((f, i) => (
                          <li key={i} className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            <span style={{ color: '#8b7355' }}>—</span>
                            {f.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <FieldTextarea
                    label="Anything else you would like us to know"
                    value={form.notes}
                    onChange={v => update('notes', v)}
                    placeholder="Optional"
                    rows={3}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-1">
                  <div
                    className="rounded-lg p-6 mb-8"
                    style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <ReviewRow label="Name" value={form.fullName} />
                    <ReviewRow label="Email" value={form.email} />
                    <ReviewRow label="Phone" value={form.phone || '—'} />
                    <ReviewRow label="Space Type" value={form.spaceType} />
                    <ReviewRow label="Vision" value={form.feeling} />
                    <ReviewRow label="Designer / Architect" value={form.designerName || '—'} />
                    <ReviewRow label="Timeline" value={form.timeline} />
                    <ReviewRow label="Investment" value={form.investment} />
                    {(form.files as unknown as File[]).length > 0 && (
                      <ReviewRow
                        label="Reference Images"
                        value={(form.files as unknown as File[]).map(f => f.name).join(', ')}
                      />
                    )}
                    <ReviewRow label="Additional Notes" value={form.notes || '—'} />
                  </div>

                  {submitError && (
                    <p className="text-sm mb-4 text-center" style={{ color: '#c0392b' }}>
                      {submitError}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300"
                    style={{
                      background: isSubmitting ? 'rgba(139,115,85,0.4)' : '#8b7355',
                      color: isSubmitting ? 'rgba(255,255,255,0.5)' : 'white',
                      letterSpacing: '0.15em',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit Application'}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          {step > 1 ? (
            <button
              type="button"
              onClick={goPrev}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < 4 && (
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed()}
              className="text-xs tracking-widest uppercase transition-all duration-200 px-6 py-3"
              style={{
                background: canProceed() ? 'transparent' : 'transparent',
                border: `1px solid ${canProceed() ? '#8b7355' : 'rgba(255,255,255,0.1)'}`,
                color: canProceed() ? '#c9aa82' : 'rgba(255,255,255,0.2)',
                cursor: canProceed() ? 'pointer' : 'not-allowed',
              }}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
