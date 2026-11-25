import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '../components/ServicePage'
import { BlurText, Eyebrow, Reveal, ScrollProgress } from '../components/ui'
import { CTA } from '../sections/CTAFooter'
// Photos from Unsplash (free under the Unsplash License):
// hero photo-1568992687947-868a62a9f521
// members photo-1560250097-0b93528c311a · photo-1573497019940-1c28c88b4f3e · photo-1500648767791-00dcc994a43e
// photo-1607746882042-944635dfe10e · photo-1507003211169-0a1dd7228f2d · photo-1573496359142-b8d87734a5a2
// photo-1599566150163-29194dcaad36 · photo-1494790108377-be9c29b29330
import heroImg from '../assets/team/hero.jpg'
import m1 from '../assets/team/member-1.jpg'
import m2 from '../assets/team/member-2.jpg'
import m3 from '../assets/team/member-3.jpg'
import m4 from '../assets/team/member-4.jpg'
import m5 from '../assets/team/member-5.jpg'
import m6 from '../assets/team/member-6.jpg'
import m7 from '../assets/team/member-7.jpg'
import m8 from '../assets/team/member-8.jpg'

/* ─────────────────────────────────────────────────────────────
   Our Team — page copy mirrors simplyict.com.au/our-team.
   ⚠ PLACEHOLDER TEAM: the live page has no member details yet.
   The names, roles, bios and stock photos below are samples —
   replace them with real staff (and real LinkedIn URLs) before launch.
   ───────────────────────────────────────────────────────────── */
const TEAM = [
  { name: 'James Whitfield', role: 'Managing Director', img: m1, linkedin: '#', bio: 'James founded Simply ICT to make technology work for people, and he still sets our direction every day.' },
  { name: 'Sarah Mitchell', role: 'Operations Manager', img: m2, linkedin: '#', bio: 'Sarah keeps every project on time and every client informed, so working with us always feels easy.' },
  { name: 'Daniel Romano', role: 'Senior Systems Engineer', img: m3, linkedin: '#', bio: 'Daniel designs and maintains the servers, cloud platforms and backups that our clients rely on daily.' },
  { name: 'Priya Nair', role: 'Cybersecurity Specialist', img: m4, linkedin: '#', bio: 'Priya protects our clients with security audits and recovery plans, and explains every risk clearly.' },
  { name: 'Marcus Tan', role: 'Network & Infrastructure Engineer', img: m5, linkedin: '#', bio: 'Marcus plans, installs and fine-tunes business networks and Wi-Fi so every office stays fast and secure.' },
  { name: 'Emily Carter', role: 'Cloud & Microsoft 365 Consultant', img: m6, linkedin: '#', bio: 'Emily leads our Microsoft 365 and Azure projects, from careful migrations to hands-on staff training.' },
  { name: 'Liam O’Connor', role: 'Web Developer', img: m7, linkedin: '#', bio: 'Liam builds fast, secure WordPress and WooCommerce websites that our clients can easily update themselves.' },
  { name: 'Chloe Bennett', role: 'Helpdesk & Support Lead', img: m8, linkedin: '#', bio: 'Chloe runs our helpdesk and makes sure every support request gets a quick, friendly and clear answer.' },
]

const HERO = {
  crumb: 'Our Team',
  tagline: 'The people behind Simply ICT',
  title: ['Our', 'Team'],
  hero: {
    img: heroImg,
    focus: '62% 50%',
    text: 'Decades of combined experience across managed IT, web development, cybersecurity and cloud infrastructure — based in North Lakes, QLD, supporting clients across Australia.',
    cta: 'Contact us',
  },
}

/* LinkedIn mark (SVG Logos, CC0) */
function LinkedInLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" className={className}>
      <path fill="#0a66c2" d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" />
    </svg>
  )
}

/* ───────── Team card: photo front, frosted back with bio + LinkedIn ───────── */
const FACE = 'absolute inset-0 overflow-hidden rounded-[24px] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'

function TeamCard({ member }) {
  const [flipped, setFlipped] = useState(false)
  const { name, role, bio, img, linkedin } = member

  return (
    <div
      className="group h-full [perspective:1400px]"
      // touch screens have no hover: a tap flips the card (taps on the link still navigate)
      onClick={(e) => { if (!e.target.closest('a')) setFlipped((f) => !f) }}
    >
      <div
        className={`relative aspect-[4/5] w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d] group-focus-within:[transform:rotateY(180deg)] [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* front — photo, name and position; softly blurs as it turns away */}
        <div className={`${FACE} text-white shadow-[0_30px_60px_-40px_rgba(11,18,32,.6)]`}>
          <div
            className={`absolute inset-0 flex flex-col justify-end p-5 transition-[filter] duration-500 group-focus-within:blur-[6px] [@media(hover:hover)]:group-hover:blur-[6px] md:p-6 ${flipped ? 'blur-[6px]' : ''}`}
          >
            <img src={img} alt={`${name}, ${role}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050912]/85 via-[#050912]/15 to-transparent" />
            <div className="relative">
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] md:text-[22px]">{name}</h3>
              <p className="mt-1 text-[14px] font-medium text-white/75">{role}</p>
            </div>
          </div>
        </div>

        {/* back — frosted glass over a blurred copy of the photo; content sharpens into focus */}
        <div className={`${FACE} bg-navy text-white [transform:rotateY(180deg)]`}>
          <img src={img} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl" />
          <div className="absolute inset-0 bg-[#07101f]/72" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(70% 60% at 100% 0%, rgba(34,211,238,.22), transparent 70%), radial-gradient(70% 60% at 0% 100%, rgba(59,130,246,.35), transparent 70%)' }}
          />
          <div
            className={`relative flex h-full flex-col p-6 transition-[filter,opacity] delay-150 duration-700 ${
              flipped
                ? 'opacity-100 blur-0'
                : 'opacity-40 blur-[8px] group-focus-within:opacity-100 group-focus-within:blur-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:blur-0'
            }`}
          >
            <img src={img} alt="" aria-hidden="true" className="h-16 w-16 rounded-2xl object-cover object-top" />
            <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.02em]">{name}</h3>
            <p className="mt-1 text-[14px] font-semibold text-white">{role}</p>
            <span className="mt-4 h-px w-full bg-white/20" />
            {/* bios are written as one complete sentence of about three lines — never cut off */}
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/80">{bio}</p>

            <a
              href={linkedin}
              target={linkedin && linkedin !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="group/link mt-auto inline-flex w-fit items-center gap-2.5 rounded-full bg-white py-2 pl-2.5 pr-4 text-[14px] font-semibold text-ink transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(10,102,194,.8)]"
            >
              <LinkedInLogo className="h-6 w-6" />
              LinkedIn
              <ArrowUpRight size={15} className="text-muted transition-transform duration-300 group-hover/link:rotate-45" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Team() {
  return (
    <section id="team" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-52 top-40 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.14), transparent 70%)' }}
      />
      <div className="container-site relative">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>Our team members</Eyebrow>
            <BlurText
              as="h2"
              text="Real people who know your setup"
              className="h-display mt-4 max-w-[14ch] text-[36px] sm:text-[46px] md:text-[54px]"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[16.5px] leading-relaxed text-muted lg:ml-auto">
              When you call Simply ICT, you talk to a friendly local expert — not a ticket queue. Hover over a card to
              meet the person behind it.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.08}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function OurTeam() {
  return (
    <>
      <ScrollProgress />
      <PageHero page={HERO} next="#team" />
      <Team />
      <CTA
        title="Have a question for our team?"
        sub="Call, email or send a message — we’ll get back to you within one business day."
        primaryLabel="Send us a message"
      />
    </>
  )
}
