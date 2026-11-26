import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { NAV, CONTACT } from '../data/content'
import { Logo, Button, EASE } from './ui'

function NewBadge({ light = false }) {
  return (
    <span className={`ml-1.5 rounded-md px-1.5 py-[1px] text-[10.5px] font-semibold ${light ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-brand-blue/10 text-brand-deep'}`}>
      New
    </span>
  )
}

function Dropdown({ item }) {
  const wide = item.items.length > 4
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
      transition={{ duration: 0.25, ease: EASE }}
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
    >
      <div className={`grid gap-0.5 rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-20px_rgba(11,18,32,.25)] ${wide ? 'w-[560px] grid-cols-2' : 'w-[300px]'}`}>
        {item.items.map(({ label, href, desc, icon: Icon }) => (
          <a key={label} href={href || item.href} className="group/i flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-paper">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-blue/[0.08] text-brand-blue transition-colors group-hover/i:bg-brand-blue group-hover/i:text-white">
              <Icon size={17} />
            </span>
            <span>
              <span className="block text-[14px] font-semibold text-ink">{label}</span>
              <span className="block text-[12.5px] leading-snug text-muted">{desc}</span>
            </span>
          </a>
        ))}
      </div>
    </motion.div>
  )
}

/* `solid` forces the opaque state from the top, for pages that open on a light
   background instead of a dark photo banner (e.g. the privacy policy). */
export default function Navbar({ path = '/', solid = false }) {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mAcc, setMAcc] = useState(null)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 60))
  const pill = solid || scrolled
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : '' }, [mobile])
  // a top-level item is "current" when its href is a page (not a hash link) we're on
  const isCurrent = (href) => !!href && !href.includes('#') && href !== '/' && (path === href || path.startsWith(`${href}/`))

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4 xl:px-6"
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[1480px] items-center justify-between gap-4 rounded-b-[26px] border border-t-0 transition-[height,background-color,border-color,box-shadow,padding] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            pill
              ? 'h-[70px] border-line bg-white px-5 shadow-[0_14px_36px_-22px_rgba(11,18,32,.45)] sm:px-7'
              : 'h-[84px] border-transparent bg-transparent px-2 sm:px-2 xl:px-2'
          }`}
        >
          <Logo size={34} className={`shrink-0 transition-colors duration-300 ${pill ? 'text-ink' : 'text-white'}`} />

          <ul className="hidden items-center xl:flex" onMouseLeave={() => setOpen(null)}>
            {NAV.map((item) => {
              const active = isCurrent(item.href) || !!item.items?.some((sub) => isCurrent(sub.href))
              return (
                <li key={item.label} className="relative" onMouseEnter={() => setOpen(item.items ? item.label : null)}>
                  <a
                    href={item.href}
                    onFocus={() => setOpen(item.items ? item.label : null)}
                    aria-expanded={item.items ? open === item.label : undefined}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center whitespace-nowrap rounded-full px-3 py-2 text-[14.5px] font-medium transition-colors duration-300 2xl:px-3.5 ${
                      pill
                        ? open === item.label || active ? 'bg-paper text-ink' : 'text-ink/75 hover:text-ink'
                        : open === item.label || active ? 'bg-white/10 text-white' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {item.badge && <NewBadge light={!pill} />}
                    {item.items && <ChevronDown size={14} className={`ml-1 transition-transform duration-300 ${open === item.label ? 'rotate-180' : ''}`} />}
                  </a>
                  <AnimatePresence>{open === item.label && item.items && <Dropdown item={item} />}</AnimatePresence>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={CONTACT.phoneHref}
              aria-label={`Call ${CONTACT.phone}`}
              className={`hidden items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[14.5px] font-semibold transition-colors duration-300 md:inline-flex ${
                pill ? 'border-line bg-white text-ink hover:border-ink/30' : 'border-white/25 bg-white/[0.06] text-white backdrop-blur hover:border-white/50'
              }`}
            >
              <Phone size={15} className={pill ? 'text-brand-blue' : 'text-brand-cyan'} />
              <span className="hidden min-[1400px]:inline">{CONTACT.phone}</span>
            </a>
            <Button href="/contact-us" className="hidden sm:inline-flex">Free quote</Button>
            <button
              onClick={() => setMobile(true)}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors xl:hidden ${pill ? 'border-line bg-white text-ink' : 'border-white/25 bg-white/[0.06] text-white'}`}
              aria-label="Open menu"
            >
              <Menu size={19} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-white px-5 pb-8 pt-5 xl:hidden"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between">
              <Logo size={34} />
              <button onClick={() => setMobile(false)} className="grid h-11 w-11 place-items-center rounded-full border border-line" aria-label="Close menu">
                <X size={19} />
              </button>
            </div>
            <motion.ul className="mt-8 flex-1 overflow-y-auto" initial="h" animate="s" transition={{ staggerChildren: 0.05 }}>
              {NAV.map((item) => (
                <motion.li
                  key={item.label}
                  variants={{ h: { opacity: 0, y: 14, filter: 'blur(6px)' }, s: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  className="border-b border-line"
                >
                  <div className="flex items-center justify-between">
                    <a href={item.href} onClick={() => setMobile(false)} className="flex items-center py-4 text-[21px] font-semibold tracking-tight">
                      {item.label}
                      {item.badge && <NewBadge />}
                    </a>
                    {item.items && (
                      <button
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => setMAcc(mAcc === item.label ? null : item.label)}
                        aria-label={`Toggle ${item.label}`}
                        aria-expanded={mAcc === item.label}
                      >
                        <ChevronDown size={18} className={`transition-transform ${mAcc === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {mAcc === item.label && item.items && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="grid gap-1 pb-4">
                          {item.items.map(({ label, href, icon: Icon }) => (
                            <a key={label} href={href || item.href} onClick={() => setMobile(false)} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] text-muted">
                              <Icon size={16} className="text-brand-blue" /> {label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-6 grid gap-3" onClick={() => setMobile(false)}>
              <Button href="/contact-us" className="justify-between">Get a free quote</Button>
              <Button href={CONTACT.phoneHref} variant="outline" className="justify-between">Call {CONTACT.phone}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
