import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight, CalendarCheck, Check, Clock, FileText, Mail, MapPin, MessageSquareReply, Minus, Navigation, Phone,
  Plus, Send,
} from 'lucide-react'
import { PageHero } from '../components/ServicePage'
import { BlurText, EASE, Eyebrow, Reveal, ScrollProgress } from '../components/ui'
import HeroDots from '../components/HeroDots'
import { CTA } from '../sections/CTAFooter'
import { CONTACT } from '../data/content'
import heroImg from '../assets/managed/helpdesk.jpg'

/* ─────────────────────────────────────────────────────────────
   Contact Us — content mirrors simplyict.com.au/contact-us,
   plus: live open/closed status, what happens next, map and FAQ.
   ───────────────────────────────────────────────────────────── */

/* Where the form posts. Leave empty to fall back to opening the visitor's
   email app with the message pre-filled (nothing is lost, nothing is faked).
   Set to your form handler URL (e.g. Formspree, a WordPress endpoint) to send directly. */
const FORM_ENDPOINT = ''

const DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=North+Lakes+QLD+4509+Australia'
const MAP_EMBED = 'https://www.google.com/maps?q=North+Lakes+QLD+4509+Australia&z=13&output=embed'

const SUBJECTS = [
  'Managed IT Services',
  'Web Design & Hosting',
  'SEO & E-Commerce',
  'Hardware & Infrastructure',
  'AI Services',
  'Something else',
]

const HERO = {
  crumb: 'Contact Us',
  tagline: 'Contact us',
  title: ['We’d love to', 'hear from you'],
  hero: {
    img: heroImg,
    focus: '62% 35%',
    text: 'Reach out for support, a quote or general advice. We reply to every enquiry within one business day.',
    cta: 'Send us a message',
    ctaHref: '#message',
  },
}

/* ───────── Live "open now" status (Brisbane time, Mon–Fri 8:30–17:30) ───────── */
function useOpenStatus() {
  const compute = () => {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Brisbane', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false })
        .formatToParts(new Date())
        .map((p) => [p.type, p.value]),
    )
    const minutes = (Number(parts.hour) % 24) * 60 + Number(parts.minute)
    const weekday = !['Sat', 'Sun'].includes(parts.weekday)
    return weekday && minutes >= 8 * 60 + 30 && minutes < 17 * 60 + 30
  }
  const [open, setOpen] = useState(compute)
  useEffect(() => {
    const id = window.setInterval(() => setOpen(compute()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return open
}

function OpenBadge({ open, dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold ${
        open
          ? dark ? 'border border-emerald-400/25 bg-emerald-400/10 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
          : dark ? 'border border-white/15 bg-white/[0.06] text-white/70' : 'bg-paper text-muted'
      }`}
    >
      <span className="relative flex h-2 w-2">
        {open && <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? 'bg-emerald-400' : 'bg-slate-400'}`} />
      </span>
      {open ? 'Open now' : 'Closed — we’ll reply next business day'}
    </span>
  )
}

/* ───────── Details column ───────── */
function Details({ open }) {
  const reduce = useReducedMotion()
  const items = [
    { icon: Phone, label: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: 'Location', value: 'North Lakes, QLD 4509, Australia', href: DIRECTIONS, cta: 'Get directions', external: true },
    { icon: Clock, label: 'Hours', value: 'Monday – Friday, 8:30am – 5:30pm' },
  ]
  return (
    <div>
      <Eyebrow>Our details</Eyebrow>
      <BlurText as="h2" text="Talk to a real person" className="h-display mt-4 max-w-[14ch] text-[34px] sm:text-[42px] xl:text-[46px]" />
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">
          Support, a quote or just some honest advice — pick whichever way suits you best.
        </p>
      </Reveal>

      <ul className="mt-8 space-y-3">
        {items.map(({ icon: Icon, label, value, href, cta, external }, i) => {
          const inner = (
            <>
              <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-line text-brand-blue transition-[border-color,color] duration-500 group-hover:border-transparent group-hover:text-white">
                <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'var(--brand-gradient)' }} />
                <Icon size={18} className="relative" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] text-muted">{label}</span>
                <span className="block break-words text-[15.5px] font-semibold text-ink">{value}</span>
              </span>
              {href && (
                <span className="hidden shrink-0 items-center gap-1 text-[13px] font-semibold text-brand-deep sm:inline-flex">
                  {cta}
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" />
                </span>
              )}
            </>
          )
          const cls = 'group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-[border-color,box-shadow,transform] duration-300'
          return (
            <Reveal as="li" key={label} delay={0.08 + i * 0.06}>
              {href ? (
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={`${cls} hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-[0_16px_32px_-22px_rgba(59,130,246,.6)]`}
                >
                  {inner}
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </Reveal>
          )
        })}
      </ul>

      {/* Prefer to talk? */}
      <Reveal delay={0.3} className="mt-5">
        <div className="relative isolate overflow-hidden rounded-[24px] bg-navy p-6 text-white md:p-7">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden="true"
            style={{ background: 'radial-gradient(60% 90% at 100% 0%, rgba(34,211,238,.2), transparent 70%), radial-gradient(60% 90% at 0% 100%, rgba(59,130,246,.3), transparent 70%)' }}
          />
          <HeroDots reduce={!!reduce} gap={18} boost={0.6} />
          <div className="relative">
            <OpenBadge open={open} dark />
            <p className="mt-4 text-[22px] font-semibold tracking-[-0.02em]">Prefer to talk?</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">
              Our phone lines are answered Monday to Friday, 8:30am – 5:30pm.
            </p>
            <a
              href={CONTACT.phoneHref}
              className="group mt-5 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 text-[15px] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: 'var(--brand-gradient)' }}>
                <Phone size={16} />
              </span>
              Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

/* ───────── Message form ───────── */
const field =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 outline-none transition-[border-color,box-shadow] duration-200 focus:border-brand-blue focus:shadow-[0_0_0_4px_rgba(59,130,246,.12)]'

function Label({ htmlFor, children, optional }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13.5px] font-semibold text-ink">
      {children}
      {optional ? <span className="ml-1 font-normal text-muted">(optional)</span> : <span className="ml-0.5 text-brand-blue">*</span>}
    </label>
  )
}

function MessageForm() {
  const reduce = useReducedMotion()
  const [values, setValues] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [trap, setTrap] = useState({ company: '', website: '' }) // honeypots — real people leave these blank
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!values.name.trim()) er.name = 'Please tell us your name.'
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) er.email = 'Please enter a valid email address.'
    if (!values.message.trim()) er.message = 'Please add a short message.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (trap.company || trap.website) { setStatus('sent'); return } // quietly drop bots
    if (!validate()) return

    if (!FORM_ENDPOINT) {
      const subject = `Website enquiry${values.subject ? ` — ${values.subject}` : ''}`
      const body = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.phone ? `Phone: ${values.phone}` : null,
        values.subject ? `Subject: ${values.subject}` : null,
        '',
        values.message,
      ].filter((line) => line !== null).join('\n')
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    try {
      setStatus('sending')
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const done = status === 'sent' || status === 'mailto'

  return (
    <div id="message" className="relative overflow-hidden rounded-[28px] border border-line bg-white p-6 shadow-[0_40px_80px_-50px_rgba(11,18,32,.5)] sm:p-8 lg:p-10">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-60 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.18), transparent 70%)' }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative flex min-h-[520px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
              className="grid h-16 w-16 place-items-center rounded-2xl text-white shadow-[0_18px_40px_-16px_rgba(59,130,246,.9)]"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <Check size={30} strokeWidth={2.6} />
            </motion.span>
            {status === 'sent' ? (
              <>
                <h3 className="mt-6 text-[26px] font-semibold tracking-[-0.02em] text-ink">Thanks{values.name ? `, ${values.name.split(' ')[0]}` : ''}!</h3>
                <p className="mt-2 max-w-sm text-[16px] leading-relaxed text-muted">Your message is on its way. We’ll get back to you within one business day.</p>
              </>
            ) : (
              <>
                <h3 className="mt-6 text-[26px] font-semibold tracking-[-0.02em] text-ink">Almost there</h3>
                <p className="mt-2 max-w-sm text-[16px] leading-relaxed text-muted">
                  Your email app should have opened with your message ready — just press send. If it didn’t, email us at{' '}
                  <a href={`mailto:${CONTACT.email}`} className="font-semibold text-brand-deep underline-offset-4 hover:underline">{CONTACT.email}</a>.
                </p>
              </>
            )}
            <button
              type="button"
              onClick={() => { setStatus('idle'); setValues({ name: '', email: '', phone: '', subject: '', message: '' }) }}
              className="mt-7 text-[14px] font-semibold text-brand-deep underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={false}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative"
          >
            <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-ink md:text-[32px]">Send us a message</h2>
            <p className="mt-2 text-[15.5px] text-muted">Complete the form and we’ll reply within one business day.</p>

            {/* honeypots: hidden from people, tempting to bots */}
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label>Company (leave blank)<input tabIndex={-1} autoComplete="off" value={trap.company} onChange={(e) => setTrap((t) => ({ ...t, company: e.target.value }))} /></label>
              <label>Website URL (leave blank)<input tabIndex={-1} autoComplete="off" value={trap.website} onChange={(e) => setTrap((t) => ({ ...t, website: e.target.value }))} /></label>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="c-name">Your name</Label>
                <input id="c-name" autoComplete="name" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined} className={`${field} ${errors.name ? '!border-red-400' : ''}`} placeholder="Jane Smith" />
                {errors.name && <p id="c-name-err" className="mt-1.5 text-[13px] text-red-500">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="c-email">Your email</Label>
                <input id="c-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined} className={`${field} ${errors.email ? '!border-red-400' : ''}`} placeholder="jane@company.com.au" />
                {errors.email && <p id="c-email-err" className="mt-1.5 text-[13px] text-red-500">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="c-phone" optional>Phone number</Label>
                <input id="c-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} className={field} placeholder="04xx xxx xxx" />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="mb-2 block text-[13.5px] font-semibold text-ink">
                  What can we help with?<span className="ml-1 font-normal text-muted">(optional)</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((s) => {
                    const active = values.subject === s
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setValues((v) => ({ ...v, subject: active ? '' : s }))}
                        className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-[border-color,background-color,color,box-shadow] duration-200 ${
                          active
                            ? 'border-transparent text-white shadow-[0_10px_24px_-12px_rgba(59,130,246,.9)]'
                            : 'border-line bg-white text-ink/75 hover:border-brand-blue/40 hover:text-ink'
                        }`}
                        style={active ? { background: 'var(--brand-gradient)' } : undefined}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <Label htmlFor="c-message">Your message</Label>
                <textarea id="c-message" rows={5} value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-message-err' : undefined} className={`${field} resize-y ${errors.message ? '!border-red-400' : ''}`} placeholder="Tell us a little about what you need…" />
                {errors.message && <p id="c-message-err" className="mt-1.5 text-[13px] text-red-500">{errors.message}</p>}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-[12.5px] leading-relaxed text-muted">
                We only use your details to respond to your enquiry. See our <a href="/#top" className="font-medium text-ink underline-offset-4 hover:underline">Privacy Policy</a>.
              </p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex shrink-0 items-center gap-3 rounded-full py-2.5 pl-6 pr-2.5 text-[15px] font-semibold text-white transition-[transform,box-shadow,filter] duration-300 hover:shadow-[0_12px_32px_-10px_rgba(59,130,246,.75)] active:scale-[0.98] disabled:opacity-70"
                style={{ background: 'var(--brand-gradient)' }}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-brand-blue">
                  <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </div>
            {status === 'error' && (
              <p className="mt-4 text-[14px] text-red-500">
                Sorry, something went wrong. Please call {CONTACT.phone} or email {CONTACT.email}.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function ContactMain() {
  const open = useOpenStatus()
  return (
    <section id="get-in-touch" className="section relative overflow-hidden bg-paper">
      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">
          <Details open={open} />
          <Reveal y={40}>
            <MessageForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ───────── What happens next ───────── */
const NEXT = [
  { icon: MessageSquareReply, title: 'We reply within one business day', desc: 'A real person reads your message and gets back to you — usually much sooner.' },
  { icon: CalendarCheck, title: 'A free, no-obligation chat', desc: 'We listen to your goals and look at your current setup, in plain English.' },
  { icon: FileText, title: 'A clear recommendation', desc: 'Honest advice and transparent pricing. We tell you what you need — and what you don’t.' },
]

function NextSteps() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>What happens next</Eyebrow>
            <BlurText as="h2" text="From hello to a clear plan" className="h-display mt-4 max-w-[14ch] text-[36px] sm:text-[46px] md:text-[54px]" />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[16.5px] leading-relaxed text-muted lg:ml-auto">
              No sales scripts and no pressure — just a simple, friendly process to work out how we can help.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14">
        {/* connecting line behind the steps */}
        <span className="pointer-events-none absolute left-[16%] right-[16%] top-[56px] hidden h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent md:block" aria-hidden="true" />
        <ol className="relative grid gap-4 md:grid-cols-3">
          {NEXT.map(({ icon: Icon, title, desc }, i) => (
            <Reveal as="li" key={title} delay={i * 0.1} className="h-full">
              <div className="group relative flex h-full flex-col items-center rounded-[24px] border border-line bg-white p-7 text-center transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_18px_40px_-24px_rgba(59,130,246,.5)] md:p-8">
                <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-line bg-white text-brand-blue transition-[border-color,color] duration-500 group-hover:border-transparent group-hover:text-white">
                  <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'var(--brand-gradient)' }} />
                  <Icon size={24} className="relative" />
                </span>
                <span className="mt-5 text-[13px] font-semibold tabular-nums text-muted">Step 0{i + 1}</span>
                <h3 className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}

/* ───────── Map ───────── */
function MapBlock() {
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="container-site">
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[30px] border border-line bg-paper">
            <iframe
              title="Map of North Lakes, QLD"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full grayscale-[0.6] md:h-[460px]"
            />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(11,18,32,.04)]" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 rounded-2xl border border-white/60 bg-white/85 p-5 shadow-[0_20px_50px_-24px_rgba(11,18,32,.6)] backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm md:p-6">
              <div className="flex items-start gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: 'var(--brand-gradient)' }}>
                  <MapPin size={19} />
                </span>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-blue">Head office</p>
                  <p className="mt-0.5 text-[17px] font-semibold text-ink">North Lakes, QLD 4509</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">Supporting businesses right across Australia.</p>
                </div>
              </div>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink py-2 pl-4 pr-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#16213a]"
              >
                <Navigation size={14} /> Get directions
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink">
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── FAQ ───────── */
const FAQS = [
  { q: 'How quickly will you get back to me?', a: 'We respond to every enquiry within one business day — often the same day. If it’s urgent, call us on 07 5329 7997 during business hours.' },
  { q: 'Is the first consultation really free?', a: 'Yes. We’ll talk through your goals and current setup with no cost and no obligation, then give you honest recommendations.' },
  { q: 'Do you only work with businesses in North Lakes?', a: 'No. We’re based in North Lakes, QLD, but we support businesses right across Australia, with on-site visits where they’re needed.' },
  { q: 'Can you work alongside our existing IT person or provider?', a: 'Absolutely. Our co-managed IT service adds specialist skills, extra capacity and after-hours cover to the team you already have.' },
  { q: 'I’m an existing client with an urgent issue — what should I do?', a: 'Call us directly so we can prioritise it straight away. On-site support has guaranteed response times, with urgent issues attended within 4 hours.' },
]

function FaqItem({ item, open, onToggle, id }) {
  const reduce = useReducedMotion()
  return (
    <div className={`rounded-2xl border transition-[border-color,background-color,box-shadow] duration-300 ${open ? 'border-brand-blue/30 bg-white shadow-[0_18px_40px_-28px_rgba(59,130,246,.6)]' : 'border-line bg-white hover:border-ink/15'}`}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-6"
        >
          <span className="text-[16.5px] font-semibold text-ink md:text-[17.5px]">{item.q}</span>
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${open ? 'text-white' : 'bg-paper text-ink'}`}
            style={open ? { background: 'var(--brand-gradient)' } : undefined}
          >
            {open ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0, filter: 'blur(6px)' }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[15.5px] leading-relaxed text-muted md:px-6 md:pb-6">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section bg-paper">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <BlurText as="h2" text="Questions before you get in touch?" className="h-display mt-5 max-w-[14ch] text-[35px] sm:text-[44px] xl:text-[50px]" />
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
                Here are the things people most often ask us. Can’t see yours? Just send us a message.
              </p>
            </Reveal>
          </div>
          <ul className="space-y-3">
            {FAQS.map((item, i) => (
              <Reveal as="li" key={item.q} delay={i * 0.05}>
                <FaqItem id={`faq-${i}`} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <>
      <ScrollProgress />
      <PageHero page={HERO} next="#get-in-touch" />
      <ContactMain />
      <NextSteps />
      <MapBlock />
      <Faq />
      <CTA
        title="Prefer email or a call back?"
        sub="We’ll respond to every enquiry within one business day."
        primaryLabel={`Email ${CONTACT.email}`}
      />
    </>
  )
}
