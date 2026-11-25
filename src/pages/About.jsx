import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUpRight, Check, Cpu, Handshake, ShieldCheck,
} from 'lucide-react'
import { PageHero } from '../components/ServicePage'
import { BlurText, Button, Counter, Eyebrow, EASE, Reveal, ScrollProgress } from '../components/ui'
import HeroDots from '../components/HeroDots'
import { Process } from '../sections/Middle'
import { CTA } from '../sections/CTAFooter'
import { SERVICES, STATS } from '../data/content'
import { TECH_LOGOS } from '../data/techLogos'
import imgManaged from '../assets/services/managed-it.jpg'
import imgWeb from '../assets/services/web.jpg'
import imgInfra from '../assets/services/infrastructure.jpg'
import imgAI from '../assets/services/ai.jpg'
// Photos from Unsplash (free under the Unsplash License):
// hero photo-1556761175-b413da4baf72 · story-main photo-1758691737138-7b9b1884b1db
// story-side photo-1531497865144-0464ef8fb9a9
import heroImg from '../assets/about/hero.jpg'
import imgStoryMain from '../assets/about/story-main.jpg'
import imgStorySide from '../assets/about/story-side.jpg'

/* ─────────────────────────────────────────────────────────────
   About Us — content mirrors simplyict.com.au/about-us, with
   extra sections built from existing business content:
   what we do, how we work, local support and technology.
   ───────────────────────────────────────────────────────────── */

const HERO = {
  crumb: 'About Us',
  tagline: 'We make technology human',
  title: ['About', 'Simply ICT'],
  hero: {
    img: heroImg,
    focus: '50% 45%',
    text: 'For over 30 years we’ve helped Australian businesses use technology to grow, compete and succeed — in plain language, with no jargon.',
    cta: 'Contact us today',
  },
}

const VALUES = [
  { icon: Cpu, title: 'Expertise', desc: 'Deep technical knowledge across infrastructure, cloud, web and security platforms.' },
  { icon: ShieldCheck, title: 'Reliability', desc: 'We turn up on time, keep our promises, and stand behind every solution we deliver.' },
  { icon: Handshake, title: 'Partnership', desc: 'Your success is our success. We build lasting relationships — not just service contracts.' },
]

const SERVICE_IMAGES = [imgManaged, imgWeb, imgInfra, imgAI]
const SERVICE_FOCUS = ['68% 40%', '62% 45%', '90% 55%', '50% 28%']

/* ───────── Our story: photo collage + narrative + stats ───────── */
function Story() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const mainY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const sideY = useTransform(scrollYProgress, [0, 1], ['18%', '-14%'])

  return (
    <section id="story" ref={ref} className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-24 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.14), transparent 70%)' }}
      />
      <div className="container-site relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">
          {/* collage */}
          <Reveal y={40} className="relative pb-16 sm:pb-20 lg:pb-24">
            <motion.div style={reduce ? undefined : { y: mainY }} className="relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-46px_rgba(11,18,32,.55)]">
              <img src={imgStoryMain} alt="The Simply ICT team celebrating a win together" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              style={reduce ? undefined : { y: sideY }}
              className="absolute -bottom-2 right-0 w-[52%] overflow-hidden rounded-[22px] border-[6px] border-white shadow-[0_30px_60px_-30px_rgba(11,18,32,.6)] sm:right-[-4%]"
            >
              <img src={imgStorySide} alt="Colleagues helping each other at their desks" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </motion.div>

            {/* years badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.3 }}
              className="absolute -left-2 bottom-6 rounded-[22px] px-6 py-5 text-white sm:-left-5 sm:bottom-10"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <Counter value={30} suffix="+" className="block text-[44px] font-semibold leading-none tracking-[-0.04em] md:text-[52px]" />
              <p className="mt-1.5 text-[13px] font-medium text-white/90">Years making<br />tech human</p>
            </motion.div>
          </Reveal>

          {/* narrative */}
          <div>
            <Eyebrow>Our story</Eyebrow>
            <BlurText
              as="h2"
              text={'More than an IT company, \n a long-term partner'}
              className="h-display mt-5 whitespace-nowrap text-[26px] min-[400px]:text-[30px] sm:text-[40px] lg:text-[36px] xl:text-[46px]"
            />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
                <p>
                  Simply ICT was founded on a simple idea: technology should serve people, not the other way around. For
                  over three decades we’ve delivered IT support, web solutions and infrastructure to businesses across
                  Australia.
                </p>
                <p>
                  What sets us apart is how we work. We partner with you on a long-term technology strategy focused on
                  measurable business results — explained in terms anyone can follow.
                </p>
                <p>
                  Today we support hundreds of Australian businesses with managed IT, web development, hardware
                  procurement and strategic consulting.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.24} className="mt-9">
              <Button href="#contact">Talk to our team</Button>
            </Reveal>
          </div>
        </div>

        {/* stats */}
        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white px-4 py-8 text-center">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  className="block text-[34px] font-semibold leading-none tracking-[-0.04em] text-ink md:text-[44px]"
                />
                <p className="mt-2.5 text-[14px] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── Values: pinned dark section — one card arrives per scroll step ───────── */
function useMediaQuery(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatch(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return match
}

/* each card owns one step of the pinned scroll: [start, end] of the progress range */
const valueRange = (i, n) => {
  const step = 0.9 / n // leave the last 10% as a pause with everything visible
  return [i * step, i * step + step * 0.75]
}

function ValueCard({ value, index, total, progress, pin }) {
  const reduce = useReducedMotion()
  const { icon: Icon, title, desc } = value
  const range = valueRange(index, total)
  const y = useTransform(progress, range, [180, 0])
  const opacity = useTransform(progress, range, [0, 1])
  const scale = useTransform(progress, range, [0.92, 1])
  const blurPx = useTransform(progress, range, [14, 0])
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`)
  const onMouseMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const card = (
    <article
      onMouseMove={onMouseMove}
      className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-[transform,border-color,background-color] duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06] md:p-9"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
        style={{ background: 'radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgba(59,130,246,.22), transparent 60%)' }}
      />
      <span
        className="pointer-events-none absolute inset-x-8 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,.9), transparent)' }}
      />
      <div className="relative flex items-start justify-between">
        {/* outline icon — the gradient fill fades in on hover only */}
        <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-white/15 text-brand-cyan transition-[border-color,color,box-shadow,transform] duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-transparent group-hover:text-white group-hover:shadow-[0_14px_30px_-14px_rgba(59,130,246,.9)]">
          <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'var(--brand-gradient)' }} />
          <Icon size={24} className="relative" />
        </span>
        <span className="text-[56px] font-light leading-none tracking-[-0.04em] text-white/10">0{index + 1}</span>
      </div>
      <h3 className="relative mt-auto pt-12 text-[26px] font-semibold tracking-[-0.03em] text-white md:text-[30px]">{title}</h3>
      <p className="relative mt-3 text-[16px] leading-relaxed text-white/60">{desc}</p>
    </article>
  )

  if (!pin) return <Reveal delay={index * 0.1} className="h-full">{card}</Reveal>
  return (
    <motion.div style={{ y, opacity, scale, filter }} className="h-full will-change-transform">
      {card}
    </motion.div>
  )
}

function Values() {
  const reduce = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 768px)')
  const pin = desktop && !reduce
  const section = useRef(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const n = VALUES.length

  return (
    <section ref={section} className="relative bg-navy text-white" style={pin ? { height: `${100 + n * 70}vh` } : undefined}>
      <div className={pin ? 'sticky top-0 flex h-screen items-center overflow-hidden' : 'relative overflow-hidden py-20'}>
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(45% 60% at 0% 100%, rgba(59,130,246,.22), transparent 70%), radial-gradient(40% 55% at 100% 0%, rgba(34,211,238,.14), transparent 70%)',
          }}
        />
        <HeroDots reduce={!!reduce} gap={30} boost={0.5} />

        <div className={`container-site relative w-full ${pin ? 'pt-16' : ''}`}>
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Our values</Eyebrow>
              <BlurText
                as="h2"
                text="The principles behind every job"
                className="h-display mt-4 max-w-[14ch] text-[36px] !text-white sm:text-[46px] md:text-[54px]"
              />
            </div>
            <Reveal delay={0.15}>
              <p className="max-w-md text-[16.5px] leading-relaxed text-white/60 lg:ml-auto">
                Three simple commitments guide how we work with every client — whether it’s a quick fix or a five-year
                technology plan.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} value={v} index={i} total={n} progress={scrollYProgress} pin={pin} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── What we do: four photo cards that flip to reveal details ───────── */
const FACE = 'absolute inset-0 overflow-hidden rounded-[24px] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'

function FlipCard({ service, img, focus }) {
  const [flipped, setFlipped] = useState(false)
  const { icon: Icon, title, desc, points = [], href, badge, cta } = service
  return (
    <div
      className="group h-full [perspective:1400px]"
      // touch screens have no hover: a tap flips the card (taps on the link still navigate)
      onClick={(e) => { if (!e.target.closest('a')) setFlipped((f) => !f) }}
    >
      <div
        className={`relative aspect-[4/5] h-full w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d] group-focus-within:[transform:rotateY(180deg)] [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* front — softly blurs as it turns away */}
        <div className={`${FACE} text-white shadow-[0_30px_60px_-40px_rgba(11,18,32,.6)]`}>
          <div
            className={`absolute inset-0 flex flex-col justify-end p-6 transition-[filter] duration-500 group-focus-within:blur-[6px] [@media(hover:hover)]:group-hover:blur-[6px] ${flipped ? 'blur-[6px]' : ''}`}
          >
            <img src={img} alt="" loading="lazy" style={{ objectPosition: focus }} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050912]/90 via-[#050912]/35 to-[#050912]/5" />
            {badge && (
              <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold backdrop-blur">{badge}</span>
            )}
            <div className="relative">
              {/* outline icon, not filled */}
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/35 bg-white/[0.08] text-white backdrop-blur">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-white/75">{desc}</p>
            </div>
          </div>
        </div>

        {/* back — frosted glass over a blurred copy of the photo; content sharpens into focus */}
        <div className={`${FACE} border border-white/15 bg-navy text-white [transform:rotateY(180deg)]`}>
          <img src={img} alt="" aria-hidden="true" style={{ objectPosition: focus }} className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl" />
          <div className="absolute inset-0 bg-[#07101f]/70" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(70% 60% at 100% 0%, rgba(34,211,238,.22), transparent 70%), radial-gradient(70% 60% at 0% 100%, rgba(59,130,246,.35), transparent 70%)' }}
          />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div
            className={`relative flex h-full flex-col p-6 transition-[filter,opacity] delay-150 duration-700 md:p-7 ${
              flipped
                ? 'opacity-100 blur-0'
                : 'opacity-40 blur-[8px] group-focus-within:opacity-100 group-focus-within:blur-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:blur-0'
            }`}
          >
            <span
              className="grid h-12 w-12 place-items-center rounded-xl text-white shadow-[0_14px_30px_-14px_rgba(59,130,246,.9)]"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <Icon size={22} />
            </span>
            <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.02em]">{title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white/75">{desc}</p>
            <ul className="mt-4 space-y-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[14px] text-white/85">
                  <Check size={15} strokeWidth={2.6} className="mt-0.5 shrink-0 text-brand-cyan" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={href || '#contact'}
              className="group/link mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[14.5px] font-semibold text-white"
            >
              {cta || 'Learn more'}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink transition-colors group-hover/link:bg-brand-cyan">
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/link:rotate-45" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function WhatWeDo() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <BlurText
              as="h2"
              text="One partner for everything IT"
              className="h-display mt-4 max-w-[14ch] text-[36px] sm:text-[46px] md:text-[54px]"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[16.5px] leading-relaxed text-muted lg:ml-auto">
              Managed IT, web, hardware and AI — delivered and supported by one Australian team, so there’s never any
              finger-pointing between providers.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <FlipCard service={s} img={SERVICE_IMAGES[i]} focus={SERVICE_FOCUS[i]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── Technology we work with: copy left, one cycling logo grid right ───────── */
const TECH_SLOTS = 12
const TECH_SWAP_MS = 3200

/* Every few seconds the whole grid moves on to the next set of logos — all cells at once. */
function useCyclingTech(active) {
  const [offset, setOffset] = useState(0)
  const total = TECH_LOGOS.length

  useEffect(() => {
    if (!active || total <= TECH_SLOTS) return
    const id = window.setInterval(() => setOffset((o) => (o + TECH_SLOTS) % total), TECH_SWAP_MS)
    return () => window.clearInterval(id)
  }, [active, total])

  // cell i shows logo (offset + i), wrapping round the list — every cell changes on each step
  return Array.from({ length: TECH_SLOTS }, (_, i) => (offset + i) % total)
}

function TechCell({ tech }) {
  const reduce = useReducedMotion()
  const { name, viewBox, body, color } = tech
  return (
    <li className="group relative h-[116px] bg-white transition-colors duration-300 hover:bg-paper sm:h-[132px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={name}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.94, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.96, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center"
        >
          {/* static, trusted SVG markup from src/data/techLogos.js */}
          <svg
            viewBox={viewBox}
            aria-hidden="true"
            className="h-8 w-8 transition-transform duration-500 group-hover:scale-110 sm:h-9 sm:w-9"
            style={color ? { color } : undefined}
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <span className="mt-2.5 text-[12.5px] font-semibold leading-tight text-ink/80 sm:text-[14px]">{name}</span>
        </motion.div>
      </AnimatePresence>
    </li>
  )
}

function TechStrip() {
  const reduce = useReducedMotion()
  const grid = useRef(null)
  const inView = useInView(grid, { amount: 0.3 })
  const slots = useCyclingTech(inView && !reduce)

  return (
    <section className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-1/4 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.12), transparent 70%)' }}
      />
      <div className="container-site relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>Technology we work with</Eyebrow>
            <BlurText
              as="h2"
              text="Proven platforms, set up properly"
              className="h-display mt-5 max-w-[14ch] text-[35px] sm:text-[44px] xl:text-[50px]"
            />
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
                We give independent advice and recommend what genuinely fits your business — then set it up, secure it
                and support it. From Microsoft 365 and Azure to the firewalls, servers and Wi-Fi that keep everything
                running.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <Button href="#contact">Talk to our team</Button>
            </Reveal>
          </div>

          <Reveal y={36}>
            <ul
              ref={grid}
              aria-label="Technologies we work with"
              className="grid grid-cols-3 gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4"
            >
              {slots.map((logoIndex, slot) => (
                <TechCell key={slot} tech={TECH_LOGOS[logoIndex]} />
              ))}
            </ul>
            {/* full list for screen readers and search engines — the grid only shows some at a time */}
            <p className="sr-only">{TECH_LOGOS.map((t) => t.name).join(', ')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <ScrollProgress />
      <PageHero page={HERO} next="#story" />
      <Story />
      <Values />
      <WhatWeDo />
      <Process bg="bg-paper" card="bg-white" />
      <TechStrip />
      <CTA
        title="Want to learn more?"
        sub="Tell us about your business and we’ll show you how we can help."
        primaryLabel="Contact us today"
      />
    </>
  )
}
