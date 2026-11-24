import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button, EASE } from '../components/ui'
import posterImg from '../assets/hero-poster.jpg'
import heroVideo from '../assets/hero.mp4'

/*
  ── Background media ──────────────────────────────────────────
  src/assets/hero.mp4        the looping background video (muted, no audio track)
  src/assets/hero-poster.jpg first frame, shown while the video loads and for
                             visitors who prefer reduced motion
  To change the video, replace hero.mp4 (and the poster) keeping the same names.
*/
const VIDEO_SRC = heroVideo

const fade = (delay) => ({
  initial: { opacity: 0, y: 22, filter: 'blur(12px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, ease: EASE, delay },
})

function BackgroundMedia() {
  const reduce = useReducedMotion()
  const videoRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, 140]) // gentle parallax
  const showVideo = VIDEO_SRC && !reduce

  useEffect(() => {
    // some browsers need an explicit play() for muted autoplay
    videoRef.current?.play?.().catch(() => {})
  }, [])

  return (
    <motion.div style={{ y }} className="absolute inset-0 -bottom-[140px]" aria-hidden="true">
      {showVideo ? (
        <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={posterImg}>
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        <img src={posterImg} alt="" className="h-full w-full object-cover" />
      )}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-navy text-white md:h-[100svh] md:min-h-[720px] md:items-center">
      <BackgroundMedia />

      {/* readability overlays */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, rgba(5,9,18,.92) 0%, rgba(5,9,18,.72) 38%, rgba(5,9,18,.3) 75%, rgba(5,9,18,.42) 100%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-40" aria-hidden="true" style={{ background: 'linear-gradient(rgba(5,9,18,.55), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-48" aria-hidden="true" style={{ background: 'linear-gradient(transparent, rgba(5,9,18,.85))' }} />

      <div className="container-site relative pb-20 pt-36 md:pb-0 md:pt-24">
        <div className="max-w-[760px]">
          <motion.p {...fade(0.1)} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-[13px] font-medium text-white/85 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            Australian owned · 30+ years · North Lakes, QLD
          </motion.p>
          <motion.h1
            {...fade(0.2)}
            className="mt-6 text-[44px] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-[60px] lg:text-[76px]"
          >
            Technology that works for you
          </motion.h1>
          <motion.p {...fade(0.32)} className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/75 md:text-[19px]">
            Managed IT, websites, infrastructure and AI — delivered and supported by one Australian team.
          </motion.p>
          <motion.div {...fade(0.44)} className="mt-10 flex flex-wrap gap-3">
            <Button href="#contact">Book a free consultation</Button>
            <Button href="#services" variant="ghostDark">Explore services</Button>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute inset-x-0 bottom-7 mx-auto hidden w-fit place-items-center text-white/60 hover:text-white md:grid"
      >
        <ChevronDown size={26} />
      </motion.a>
    </section>
  )
}
