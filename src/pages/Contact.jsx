import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight, CalendarCheck, Check, FileText, Mail, MapPin, MessageSquareReply, Minus, Navigation, Phone,
  Plus, Send, ShieldCheck,
} from 'lucide-react'
import { PageHero } from '../components/ServicePage'
import { BlurText, Counter, EASE, Eyebrow, Reveal, ScrollProgress } from '../components/ui'
import { CTA } from '../sections/CTAFooter'
import { CONTACT, STATS } from '../data/content'
import heroImg from '../assets/managed/helpdesk.jpg'
import teamImg from '../assets/team/hero.jpg'

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

/* ───────── Details column ───────── */
function Details() {
  const pills = [
    { icon: Phone, label: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ]
  const credentials = [STATS[0], STATS[1], STATS[3]]

  return (
    <div>
      <Eyebrow>Our details</Eyebrow>
      <BlurText
        as="h2"
        text="Talk to a real person"
        className="h-display mt-4 max-w-[12ch] text-[38px] sm:text-[48px] xl:text-[56px]"
      />

      {/* the two ways most people actually get in touch */}
      <Reveal delay={0.1} className="mt-7">
        <div className="flex flex-wrap gap-3">
          {pills.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="group inline-flex items-center gap-3 rounded-full border border-line bg-white py-2.5 pl-3 pr-6 text-[15px] font-semibold text-ink transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-[0_16px_32px_-22px_rgba(59,130,246,.6)]"
            >
              <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-line text-brand-blue transition-[border-color,color] duration-500 group-hover:border-transparent group-hover:text-white">
                <span
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'var(--brand-gradient)' }}
                />
                <Icon size={16} className="relative" />
              </span>
              <span className="break-all">{label}</span>
            </a>
          ))}
        </div>
      </Reveal>

      {/* the people who answer */}
      <Reveal delay={0.2} className="mt-7">
        <div className="relative max-w-[400px] overflow-hidden rounded-[20px] border border-line">
          <img
            src={teamImg}
            alt="The Simply ICT team at their North Lakes office"
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-[62%_50%]"
          />
          {/* heavier at the foot, so the figures sitting on the photo stay readable */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ background: 'linear-gradient(to top, rgba(5,9,18,.88) 0%, rgba(5,9,18,.6) 32%, rgba(5,9,18,.1) 62%, transparent 100%)' }}
          />
          <dl className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-3 sm:inset-x-5 sm:bottom-5">
            {/* reversed column: the figure reads first, but dt still precedes
                dd in the markup — and the label is written once, not twice */}
            {credentials.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1.5">
                <dt className="text-[10.5px] leading-snug text-white/70 sm:text-[11px]">{s.label}</dt>
                <dd>
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals}
                    className="block font-display text-[21px] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[24px]"
                  />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* address */}
      <Reveal delay={0.3} className="mt-8 border-t border-line pt-7">
        <h3 className="text-[15px] font-semibold text-ink">Address</h3>
        <p className="mt-2.5 max-w-sm text-[15.5px] leading-relaxed text-muted">
          Simply ICT, North Lakes, QLD 4509, Australia.
          <br />
          Monday – Friday, 8:30am – 5:30pm.
        </p>
        <a
          href={DIRECTIONS}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-deep underline-offset-4 hover:underline"
        >
          <Navigation size={14} />
          Get directions
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
        </a>
      </Reveal>
    </div>
  )
}

/* ───────── "I'm not a robot" check ─────────
   A plain tick-box gate: nothing to read, nothing to type. Together with the
   honeypot fields in the form it turns away the drive-by bots. There is no
   third-party script and no site key, so nothing about the visitor leaves the
   page — equally, there is no server-side proof, which a static site has
   nowhere to run. */
function RobotCheck({ state, onChange, invalid, errorId }) {
  const checking = state === 'checking'
  const verified = state === 'verified'
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl border bg-paper px-4 py-3.5 transition-colors duration-300 ${
        invalid ? 'border-red-400' : verified ? 'border-brand-blue/35' : 'border-line'
      }`}
    >
      <label className="flex cursor-pointer select-none items-center gap-3.5">
        <span className="relative grid h-[26px] w-[26px] shrink-0 place-items-center">
          <input
            type="checkbox"
            checked={checking || verified}
            onChange={onChange}
            aria-invalid={invalid || undefined}
            aria-describedby={errorId}
            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[8px] border border-line bg-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45 focus-visible:ring-offset-2"
          />
          {checking && (
            <span
              className="pointer-events-none relative h-[15px] w-[15px] animate-spin rounded-full border-2 border-brand-blue/25 border-t-brand-blue"
              aria-hidden="true"
            />
          )}
          {verified && (
            <>
              <span
                className="pointer-events-none absolute inset-0 rounded-[8px]"
                aria-hidden="true"
                style={{ background: 'var(--brand-gradient)' }}
              />
              <Check size={16} strokeWidth={3} className="pointer-events-none relative text-white" aria-hidden="true" />
            </>
          )}
        </span>
        <span className="text-[15px] font-medium text-ink">I’m not a robot</span>
      </label>

      <span className="flex shrink-0 flex-col items-center gap-0.5">
        <ShieldCheck size={18} className={verified ? 'text-brand-blue' : 'text-muted/70'} />
        <span className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-muted/70">Privacy</span>
      </span>
    </div>
  )
}

/* ───────── Message form ─────────
   Underline fields rather than boxes, with the "what are you looking for"
   chips leading the form. Labels are present but visually hidden — the
   placeholder carries the name on screen, the label carries it to a reader. */
const field =
  'w-full border-x-0 border-b border-t-0 border-line bg-transparent px-0 py-3 text-[15.5px] text-ink placeholder:text-muted/70 outline-none transition-colors duration-200 focus:border-brand-blue'

function MessageForm() {
  const reduce = useReducedMotion()
  const [values, setValues] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
  const [trap, setTrap] = useState({ address2: '', website: '' }) // honeypots — real people leave these blank
  const [robot, setRobot] = useState('idle') // idle | checking | verified
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const robotTimer = useRef(null)

  useEffect(() => () => window.clearTimeout(robotTimer.current), [])

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  // a short pause before the tick lands, so the check reads as a check
  const onRobotChange = (e) => {
    window.clearTimeout(robotTimer.current)
    setErrors((er) => ({ ...er, robot: undefined }))
    if (!e.target.checked) { setRobot('idle'); return }
    setRobot('checking')
    robotTimer.current = window.setTimeout(() => setRobot('verified'), reduce ? 0 : 650)
  }

  const validate = () => {
    const er = {}
    if (!values.name.trim()) er.name = 'Please tell us your name.'
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) er.email = 'Please enter a valid email address.'
    if (!values.message.trim()) er.message = 'Please add a short message.'
    if (robot !== 'verified') {
      er.robot = robot === 'checking' ? 'Just a moment — still checking.' : 'Please confirm you’re not a robot.'
    }
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (trap.address2 || trap.website) { setStatus('sent'); return } // quietly drop bots
    if (!validate()) return

    if (!FORM_ENDPOINT) {
      const subject = `Website enquiry${values.subject ? ` — ${values.subject}` : ''}`
      const body = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.phone ? `Phone: ${values.phone}` : null,
        values.company ? `Company: ${values.company}` : null,
        values.subject ? `Looking for: ${values.subject}` : null,
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
  const reset = () => {
    setStatus('idle')
    setValues({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
    window.clearTimeout(robotTimer.current)
    setRobot('idle')
    setErrors({})
  }

  return (
    <div
      id="message"
      className="relative overflow-hidden rounded-[28px] border border-line bg-white p-6 shadow-[0_40px_80px_-50px_rgba(11,18,32,.5)] sm:p-8 lg:p-10"
    >
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
            className="relative flex min-h-[560px] flex-col items-center justify-center text-center"
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
            <button type="button" onClick={reset} className="mt-7 text-[14px] font-semibold text-brand-deep underline-offset-4 hover:underline">
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
            {/* honeypots: hidden from people, tempting to bots */}
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label>Address line 2 (leave blank)<input tabIndex={-1} autoComplete="off" value={trap.address2} onChange={(e) => setTrap((t) => ({ ...t, address2: e.target.value }))} /></label>
              <label>Website URL (leave blank)<input tabIndex={-1} autoComplete="off" value={trap.website} onChange={(e) => setTrap((t) => ({ ...t, website: e.target.value }))} /></label>
            </div>

            <h2 className="text-[27px] font-semibold tracking-[-0.03em] text-ink md:text-[31px]">Send us a message</h2>
            <p className="mt-2 text-[15.5px] leading-relaxed text-muted">
              Tell us what you need and we’ll reply within one business day.
            </p>

            {/* what are you looking for */}
            <fieldset className="mt-8">
              <legend className="text-[17px] font-semibold tracking-[-0.02em] text-ink">What are you looking for?</legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
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

            {/* fields */}
            <div className="mt-9 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="c-name" className="sr-only">Your name</label>
                <input id="c-name" autoComplete="name" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined} className={`${field} ${errors.name ? '!border-red-400' : ''}`} placeholder="Name" />
                {errors.name && <p id="c-name-err" className="mt-1.5 text-[13px] text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="c-email" className="sr-only">Your email</label>
                <input id="c-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined} className={`${field} ${errors.email ? '!border-red-400' : ''}`} placeholder="Email" />
                {errors.email && <p id="c-email-err" className="mt-1.5 text-[13px] text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="c-phone" className="sr-only">Phone number (optional)</label>
                <input id="c-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} className={field} placeholder="Phone number" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-company" className="sr-only">Your company name (optional)</label>
                <input id="c-company" autoComplete="organization" value={values.company} onChange={set('company')} className={field} placeholder="Your company name" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="sr-only">Your message</label>
                <textarea id="c-message" rows={4} value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-message-err' : undefined} className={`${field} resize-y ${errors.message ? '!border-red-400' : ''}`} placeholder="Please tell us what you need…" />
                {errors.message && <p id="c-message-err" className="mt-1.5 text-[13px] text-red-500">{errors.message}</p>}
              </div>
            </div>

            {/* human check */}
            <div className="mt-8 max-w-[320px]">
              <RobotCheck
                state={robot}
                onChange={onRobotChange}
                invalid={!!errors.robot}
                errorId={errors.robot ? 'c-robot-err' : undefined}
              />
              {errors.robot && <p id="c-robot-err" className="mt-2 text-[13px] text-red-500">{errors.robot}</p>}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-[12.5px] leading-relaxed text-muted">
                We only use your details to respond to your enquiry. See our{' '}
                <a href="/privacy-policy" className="font-medium text-ink underline-offset-4 hover:underline">Privacy Policy</a>.
              </p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex shrink-0 items-center gap-3 rounded-full py-2.5 pl-6 pr-2.5 text-[15px] font-semibold text-white transition-[transform,box-shadow,filter] duration-300 hover:shadow-[0_12px_32px_-10px_rgba(59,130,246,.75)] active:scale-[0.98] disabled:opacity-70"
                style={{ background: 'var(--brand-gradient)' }}
              >
                {status === 'sending' ? 'Sending…' : 'Submit'}
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
  return (
    <section id="get-in-touch" className="section relative overflow-hidden bg-white">
      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">
          <Details />
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
    <section className="section bg-white">
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
        primaryHref={`mailto:${CONTACT.email}`}
      />
    </>
  )
}
