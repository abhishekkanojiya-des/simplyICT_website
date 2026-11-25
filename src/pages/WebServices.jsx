import { Gauge, Palette, PenLine } from 'lucide-react'
import ServicePage from '../components/ServicePage'
import { WEB_SERVICES } from '../data/content'
import heroImg from '../assets/services/web.jpg'
// Photos from Unsplash (free under the Unsplash License):
// web-design photo-1547658719-da2b51169166 · hosting photo-1558494949-ef010cbdcc31
// seo photo-1560472354-b33ff0c44a43 · ecommerce photo-1563013544-824ae1b704d3
// premium photo-1558655146-d09347e92766 · fast photo-1674027001840-1a3e834eb73f
// easy photo-1499951360447-b19be8fe80f5
import imgDesign from '../assets/web/web-design.jpg'
import imgHosting from '../assets/web/hosting.jpg'
import imgSeo from '../assets/web/seo.jpg'
import imgShop from '../assets/web/ecommerce.jpg'
import imgPremium from '../assets/web/premium.jpg'
import imgFast from '../assets/web/fast.jpg'
import imgEasy from '../assets/web/easy.jpg'

/* Content mirrors simplyict.com.au/web-services */

const VISUALS = {
  'web-design': { img: imgDesign, focus: '50% 40%', alt: 'Landing page designs on a desktop monitor, tablet and phone', chip: 'Fast & mobile-first' },
  'hosting-maintenance': { img: imgHosting, focus: '50% 50%', alt: 'Server racks with network cabling', chip: 'Daily backups' },
  'seo-performance': { img: imgSeo, focus: '40% 50%', alt: 'Search performance report showing clicks and impressions', chip: 'Get found first' },
  'e-commerce': { img: imgShop, focus: '50% 50%', alt: 'Customer paying online with a card on a laptop', chip: 'Secure payments' },
}

const PAGE = {
  crumb: 'Web Services',
  tagline: 'Web Services',
  title: ['Web', 'Services'],
  hero: {
    img: heroImg,
    focus: '70% 40%',
    text: 'Beautiful websites that work for you — custom WordPress sites, managed hosting, SEO and e-commerce, designed and maintained to help your business stand out online.',
  },
  explore: {
    title: 'Everything your website needs',
    text: 'Design, hosting, search and selling online — start with what you need most, and we’ll look after the rest.',
  },
  services: WEB_SERVICES.map((s) => ({ ...s, ...VISUALS[s.id] })),
  why: {
    eyebrow: 'Why it matters',
    title: 'Your website is your hardest-working salesperson.',
    text: 'It should look good, load quickly and be easy for your team to update. Already have a site that’s slow or outdated? We’ll audit it and honestly recommend whether to fix, refresh or rebuild — no hard sell.',
    cta: 'Talk to us',
    pillars: [
      { icon: Palette, label: 'Designed to look premium', img: imgPremium, alt: 'Website design system on a desktop monitor' },
      { icon: Gauge, label: 'Built to load fast', img: imgFast, alt: 'Illustration of website performance charts and a rocket' },
      { icon: PenLine, label: 'Easy for your team to update', img: imgEasy, alt: 'Laptop and desktop showing a website being edited' },
    ],
  },
  cta: {
    title: 'Ready for a website that works?',
    sub: 'Let us build you a site you’ll love. Free consultation and quote.',
    primaryLabel: 'Start your project',
  },
}

export default function WebServices() {
  return <ServicePage page={PAGE} />
}
