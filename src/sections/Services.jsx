import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { SERVICES } from '../data/content'
import { BlurText, Button, Eyebrow, Reveal } from '../components/ui'
import imgManaged from '../assets/services/managed-it.jpg'
import imgWeb from '../assets/services/web.jpg'
import imgInfra from '../assets/services/infrastructure.jpg'
import imgAI from '../assets/services/ai.jpg'

const IMAGES_BY_SERVICE = [imgManaged, imgWeb, imgInfra, imgAI]
// focal point for each photo so people stay in frame when cropped
const FOCUS_BY_SERVICE = ['68% 40%', '62% 45%', '94% 55%', '50% 28%']

/* Display order: AI Services, Web Services, Hardware & Infrastructure, Managed IT */
const ORDER = [3, 1, 2, 0]
const ITEMS = ORDER.map((k) => ({ s: SERVICES[k], img: IMAGES_BY_SERVICE[k], focus: FOCUS_BY_SERVICE[k] }))

function useIsDesktop() {
  const q = '(min-width: 1024px)'
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setD(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return d
}

/* Each line of card text rises from below once the card slides into view */
const rise = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function Card({ s, i, img, focus = 'center', desktop }) {
  const reduce = useReducedMotion()
  const v = reduce ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : rise
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.45 }}
      transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
      className={`grid shrink-0 overflow-hidden rounded-[24px] border border-line bg-paper ${
        desktop ? 'h-full w-full grid-cols-[1fr_1.05fr] shadow-[0_30px_70px_-40px_rgba(11,18,32,.45)]' : 'w-full grid-rows-[auto_1fr]'
      }`}
    >
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
        className={`flex flex-col overflow-hidden p-7 md:p-10 ${desktop ? '' : 'order-2'}`}
      >
        <motion.div variants={v} className="flex items-start justify-between">
          <span className="text-[56px] font-light leading-none tracking-[-0.04em] text-ink/15 md:text-[72px]">0{i + 1}</span>
          {s.badge && <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-[12.5px] font-semibold text-brand-deep">{s.badge}</span>}
        </motion.div>
        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="mt-auto pt-10">
          <motion.h3 variants={v} className="text-[28px] font-semibold tracking-[-0.03em] text-ink md:text-[34px]">{s.title}</motion.h3>
          <motion.p variants={v} className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">{s.desc}</motion.p>
          <ul className="mt-6 space-y-2.5">
            {s.points.map((p) => (
              <motion.li variants={v} key={p} className="flex items-center gap-2.5 text-[15px] text-ink/80">
                <Check size={16} className="shrink-0 text-brand-blue" strokeWidth={2.5} /> {p}
              </motion.li>
            ))}
          </ul>
          <motion.a variants={v} href={s.href || '#contact'} className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-ink">
            {s.cta}
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-white transition-colors group-hover:bg-brand-blue">
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
      <div className={`relative overflow-hidden ${desktop ? '' : 'order-1 aspect-[7/6]'}`}>
        <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: focus }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>
    </motion.article>
  )
}

function Intro() {
  return (
    <div>
      <Eyebrow>What we do</Eyebrow>
      <BlurText
        as="h2"
        text="Everything your business runs on under one roof"
        className="h-display mt-4 text-[36px] sm:text-[44px] xl:text-[52px]"
      />
      <Reveal delay={0.15}>
        <p className="mt-5 max-w-sm text-[16.5px] leading-relaxed text-muted">
          No more juggling five providers. One team designs, delivers and supports your whole stack.
        </p>
      </Reveal>
      <Reveal delay={0.25} className="mt-8">
        <Button href="#contact">Contact us</Button>
      </Reveal>
    </div>
  )
}

/* One card slot; scrolling swaps cards with a stacked "deck" animation:
   the next card rises from below and straightens, the current one recedes (scale + blur + fade). */
function StackCard({ item, i, n, progress }) {
  const seg = 1 / (n - 1)
  const inStart = (i - 1) * seg, inEnd = i * seg
  const outStart = i * seg, outEnd = (i + 1) * seg

  const y = useTransform(progress, [inStart, inEnd], i === 0 ? ['0vh', '0vh'] : ['100vh', '0vh'])
  const rotate = useTransform(progress, [inStart, inEnd], i === 0 ? [0, 0] : [6, 0])
  const scale = useTransform(progress, [outStart, outEnd], i === n - 1 ? [1, 1] : [1, 0.88])
  const blurPx = useTransform(progress, [outStart, outEnd], i === n - 1 ? [0, 0] : [0, 10])
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`)
  const opacity = useTransform(progress, [outStart, outEnd], i === n - 1 ? [1, 1] : [1, 0.15])
  const outY = useTransform(progress, [outStart, outEnd], i === n - 1 ? ['0%', '0%'] : ['0%', '-6%'])

  return (
    <motion.div style={{ y, rotate, zIndex: i + 1 }} className="absolute inset-0 origin-bottom-left will-change-transform">
      <motion.div style={{ scale, filter, opacity, y: outY }} className="h-full w-full origin-top will-change-transform">
        <Card s={item.s} i={i} img={item.img} focus={item.focus} desktop />
      </motion.div>
    </motion.div>
  )
}

function DesktopRail() {
  const section = useRef(null)
  const n = ITEMS.length
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const PAD = 'max(2rem,calc((100vw - 1480px) / 2 + 2rem))'

  return (
    <section id="services" ref={section} className="relative bg-white" style={{ height: `${100 + (n - 1) * 75}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden" style={{ paddingLeft: PAD, paddingRight: PAD }}>
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)]">
          <div className="relative z-20">
            <Intro />
          </div>
          <div className="relative h-[min(600px,72vh)]">
            {ITEMS.map((item, i) => (
              <StackCard key={item.s.title} item={item} i={i} n={n} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileList() {
  return (
    <section id="services" className="section bg-white">
      <div className="container-site">
        <Intro />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {ITEMS.map(({ s, img, focus }, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <Card s={s} i={i} img={img} focus={focus} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  const desktop = useIsDesktop()
  return desktop ? <DesktopRail /> : <MobileList />
}
