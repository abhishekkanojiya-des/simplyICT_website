import { motion } from 'framer-motion'
import {
  Bug, Compass, Gauge, GraduationCap, Palette, PenLine, Search, Smartphone,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { WEB_SERVICES } from '../../data/content'
import heroImg from '../../assets/web/web-design.jpg'
import imgOverview from '../../assets/detail/design-studio.jpg'
import imgChecklist from '../../assets/detail/design-devices.jpg'

/* Content mirrors simplyict.com.au/web-services/web-design/ */

/* ───────── Added section: the five stages of a build ───────── */
const STAGES = [
  {
    icon: Compass,
    title: 'Discovery & strategy',
    desc: 'We learn what the site has to do — who it is for, what you want them to do next, and what is not working today.',
  },
  {
    icon: Palette,
    title: 'Design & branding',
    desc: 'Layouts and a visual system built around your brand, shown to you before a line of code is written.',
  },
  {
    icon: PenLine,
    title: 'Build & content setup',
    desc: 'The approved design becomes a real WordPress site, with your content in place rather than placeholder text.',
  },
  {
    icon: Bug,
    title: 'Testing & launch',
    desc: 'Checked across browsers and screen sizes, forms and speed tested, then launched without the drama.',
  },
  {
    icon: GraduationCap,
    title: 'Training & handover',
    desc: 'We show your team how to run it and hand over the documentation, so the site is genuinely yours.',
  },
]

function BuildStages() {
  return (
    <section id="process" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-52 top-24 h-[480px] w-[480px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="How it runs"
          title="From first conversation to live site"
          text="Five stages, each signed off before the next one starts — so nothing about your own website is a surprise."
          center
        />

        <div className="relative mt-14">
          {/* connecting rail on wide screens */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-[2px] rounded-full lg:block"
            aria-hidden="true"
            style={{ background: 'linear-gradient(to right, rgba(59,130,246,.85), rgba(34,211,238,.25))' }}
          />

          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {STAGES.map(({ icon: Icon, title, desc }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
                className="flex gap-5 lg:block"
              >
                <span
                  className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-[0_16px_32px_-16px_rgba(59,130,246,.95)] ring-[6px] ring-white"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Icon size={22} />
                </span>
                <div className="lg:mt-6">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-deep">
                    Stage 0{i + 1}
                  </span>
                  <h3 className="mt-1.5 text-[18px] font-semibold tracking-[-0.025em] text-ink">{title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <Search size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            You see the design before the build, and the build before it goes live. If something is not right, the time
            to say so is while it is still cheap to change.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'web-design',
  family: WEB_SERVICES,
  parent: { label: 'Web Services', href: '/web-services' },
  crumb: 'Web Design',
  tagline: 'Web Services · Web Design',
  title: ['Web', 'Design'],
  kicker: 'Websites that make an impact.',
  hero: {
    img: heroImg,
    focus: '50% 40%',
    text: 'Fast, mobile-optimised WordPress sites — from a sharp brochure site through to a full online store — designed around your brand instead of around a template.',
    cta: 'Start your project',
  },
  glance: [
    { icon: Palette, k: 'Design', v: 'Custom, not a template' },
    { icon: Smartphone, k: 'Built', v: 'Fast & mobile-first' },
    { icon: PenLine, k: 'Updates', v: 'By your team, no developer' },
  ],
  overview: {
    eyebrow: 'Why design matters',
    title: 'Your website is the one salesperson who never clocks off.',
    body: [
      'It is working at 11pm, on a phone, for someone who has never heard of you. In the few seconds before they decide whether to keep reading, your site is the whole business — so it has to look like one you would trust, and it has to load before they give up.',
      'We design around your brand and your customers, then build it on WordPress so your own team can change a price, add a page or publish news without booking a developer. Every site goes out fast, secure and structured so Google can actually understand it.',
    ],
    facts: [
      { k: 'Platform', v: 'WordPress' },
      { k: 'Built mobile-first', v: 'Every screen size' },
      { k: 'Who updates the content', v: 'Your team' },
      { k: 'SEO structure', v: 'In from day one' },
    ],
    badge: {
      value: 'Custom, not a template',
      label: 'Designed around your brand and your customers, not bought off a shelf.',
    },
    img: imgOverview,
    alt: 'Website layouts open across two monitors in a design studio',
    focus: '55% 50%',
    cta: 'Start your project',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Four things every site we build has in common',
    text: 'However big the project, these are not optional extras — they are the baseline.',
    items: [
      {
        icon: Palette,
        title: 'Custom design',
        desc: 'Designed around your brand and your customers rather than dropped into an off-the-shelf theme — so your site looks like you, not like everyone else in your industry.',
      },
      {
        icon: PenLine,
        title: 'WordPress build',
        desc: 'A secure, maintainable WordPress build with an editor your team can actually use, so day-to-day changes never need a developer or a support ticket.',
      },
      {
        icon: Gauge,
        title: 'Fast & mobile-first',
        desc: 'Optimised for speed and designed for the small screen first, because that is where most of your visitors are — and where slow sites lose them.',
      },
      {
        icon: Search,
        title: 'SEO-ready structure',
        desc: 'Clean markup, proper headings, metadata and a sensible content structure from day one, so the search work that follows has something solid to build on.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What a web design project includes',
    text: 'Five stages, each one signed off before the next begins — so there are no surprises at launch.',
    items: [
      'Discovery & strategy',
      'Design & branding',
      'Build & content setup',
      'Testing & launch',
      'Training & handover',
      'Post-launch support',
    ],
    chip: 'Fast & mobile-first',
    img: imgChecklist,
    alt: 'The same site shown on a desktop, a second screen, a laptop and a phone',
    focus: '50% 50%',
    cta: 'Talk through your project',
  },
  relatedTitle: 'The rest of web services',
  cta: {
    title: 'Have a project in mind?',
    sub: 'Tell us what you need and we will come back with ideas, timelines and a fixed quote.',
    primaryLabel: 'Start your project',
  },
}

export default function WebDesign() {
  /* <BuildStages /> is built and ready but hidden for now — pass it as a child
     of ServiceDetail to bring the section back. */
  return <ServiceDetail page={PAGE} />
}
