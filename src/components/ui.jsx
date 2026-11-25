import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { normalizePath } from '../lib/router'

export const EASE = [0.22, 1, 0.36, 1]

/* ───────────── Logo (exact Simply ICT mark) ───────────── */
export function Logo({ size = 36, className = '' }) {
  return (
    <a
      href="/"
      onClick={(e) => {
        // Already on the homepage: smooth-scroll to top instead of reloading
        if (normalizePath(window.location.pathname) === '/' && document.getElementById('top')) {
          e.preventDefault()
          window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Simply ICT — home"
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#logo-g1)" />
        <path d="M13 27l10-13 4 6 6-8" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="logo-g1" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-[21px] font-semibold tracking-tight">
        Simply<span className="gradient-text">ICT</span>
      </span>
    </a>
  )
}

/* ───────────── Word-by-word blur reveal ───────────── */
export function BlurText({ text, as: Tag = 'h2', className = '', highlight = [], delay = 0 }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const MotionTag = motion[Tag]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => w === '\n' ? <br key={i} /> : (
        <motion.span
          key={i}
          className="inline-block"
          style={{ willChange: 'transform, filter, opacity' }}
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)', y: 20 },
            show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
        >
          {w}
          {i < words.length - 1 && words[i + 1] !== '\n' &&' '}
        </motion.span>
      ))}
    </MotionTag>
  )
}

/* ───────────── Generic blur-in reveal ───────────── */
export function Reveal({ children, className = '', delay = 0, y = 30, as = 'div' }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', y }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </M>
  )
}

/* ───────────── Section label ───────────── */
export function Eyebrow({ children, className = '', dark = false }) {
  return (
    <Reveal className={className}>
      <span className="inline-flex items-center gap-2.5 text-[16px] font-semibold md:text-[17px]">
        <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: 'var(--brand-gradient)' }} />
        <span className="gradient-text">{children}</span>
      </span>
    </Reveal>
  )
}

/* ───────────── Text-roll button ───────────── */
export function Button({ children, href = '#contact', variant = 'brand', className = '', icon = true }) {
  const base =
    'group relative inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full py-2.5 pl-5 pr-2.5 text-[15px] font-semibold transition-[transform,box-shadow,filter,background-color,border-color] duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2'
  const styles = {
    brand: 'text-white hover:shadow-[0_12px_32px_-10px_rgba(59,130,246,.75)] hover:brightness-105',
    outline: 'border border-line bg-white text-ink hover:border-ink/30',
    dark: 'bg-ink text-white hover:bg-[#16213a]',
    ghostDark: 'border border-white/15 text-white hover:border-white/35',
  }[variant]
  const chip = {
    brand: 'bg-white text-brand-blue',
    outline: 'bg-paper text-ink',
    dark: 'bg-white text-ink',
    ghostDark: 'bg-white/10 text-white',
  }[variant]
  return (
    <a
      href={href}
      className={`${base} ${styles} ${!icon ? 'pr-5' : ''} ${className}`}
      style={variant === 'brand' ? { background: 'var(--brand-gradient)' } : undefined}
    >
      <span className="relative block h-[1.4em] overflow-hidden leading-[1.4em]">
        <span className="block transition-transform duration-300 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span aria-hidden="true" className="absolute left-0 top-full block transition-transform duration-300 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
      </span>
      {icon && (
        <span className={`grid h-8 w-8 place-items-center rounded-full ${chip}`}>
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
        </span>
      )}
    </a>
  )
}

/* ───────────── Page scroll progress bar (top of viewport) ───────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-blue"
    />
  )
}

/* ───────────── Count-up number ───────────── */
export function Counter({ value, suffix = '', decimals = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 2, ease: 'easeOut', onUpdate: (v) => setN(v) })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className={className}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function SectionHead({ eyebrow, title, sub, center = false, dark = false, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <BlurText
        text={title}
        className={`h-display mt-4 text-[34px] transition-colors duration-700 sm:text-[44px] md:text-[50px] ${dark ? '!text-white' : ''}`}
      />
      {sub && (
        <Reveal delay={0.15}>
          <p className={`mt-5 max-w-2xl text-[17px] leading-relaxed transition-colors duration-700 ${dark ? 'text-white/65' : 'text-muted'} ${center ? 'mx-auto' : ''}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
