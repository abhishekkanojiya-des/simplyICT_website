import { ShieldCheck, TrendingUp, Zap } from 'lucide-react'
import ServicePage from '../components/ServicePage'
import { HARDWARE_SERVICES } from '../data/content'
import heroImg from '../assets/services/infrastructure.jpg'
// Photos from Unsplash (free under the Unsplash License):
// servers photo-1695668548342-c0c1ad479aee · networking photo-1594915440248-1e419eba6611
// workstations photo-1575318634028-6a0cfcb60c59 · wifi photo-1785682117495-d87ff069cdb5
// fast photo-1544197150-b99a580bb7a8 · reliable photo-1564457461758-8ff96e439e83
// grow photo-1573164713988-8665fc963095
import imgServers from '../assets/hardware/servers.jpg'
import imgNetworking from '../assets/hardware/networking.jpg'
import imgWorkstations from '../assets/hardware/workstations.jpg'
import imgWifi from '../assets/hardware/wifi.jpg'
import imgFast from '../assets/hardware/fast.jpg'
import imgReliable from '../assets/hardware/reliable.jpg'
import imgGrow from '../assets/hardware/grow.jpg'

/* Content mirrors simplyict.com.au/hardware */

const VISUALS = {
  'servers-storage': { img: imgServers, focus: '50% 50%', alt: 'Server rack with patch cables and storage equipment', chip: 'Backups & redundancy' },
  networking: { img: imgNetworking, focus: '50% 50%', alt: 'Fibre optic cables connected to a network switch', chip: 'Security & segmentation' },
  workstations: { img: imgWorkstations, focus: '50% 55%', alt: 'Business workstation with monitor, laptop and keyboard on a desk', chip: 'Business-grade hardware' },
  'wifi-installation': { img: imgWifi, focus: '60% 45%', alt: 'Wi-Fi access point mounted on a ceiling cable tray', chip: 'No more dead zones' },
}

const PAGE = {
  crumb: 'Hardware & Infrastructure',
  tagline: 'Hardware & Infrastructure',
  title: ['Hardware &', 'Infrastructure'],
  hero: {
    img: heroImg,
    focus: '80% 50%',
    text: 'The backbone of your business, built properly. We design, supply and support the hardware everything else runs on — so it stays fast, reliable and ready to grow.',
  },
  explore: {
    title: 'Infrastructure built properly, from the ground up',
    text: 'Servers, networks, workstations and Wi-Fi — specified, installed and supported by one team.',
  },
  services: HARDWARE_SERVICES.map((s) => ({ ...s, ...VISUALS[s.id] })),
  why: {
    eyebrow: 'Why it matters',
    title: 'The backbone of your business, built properly.',
    text: 'Upgrading, moving or starting fresh? Tell us your plans and we’ll recommend the right hardware and layout — with a fixed price quoted before any work begins.',
    cta: 'Talk to us',
    pillars: [
      { icon: Zap, label: 'Fast, from desk to server', img: imgFast, alt: 'Network patch panel with blue ethernet cables' },
      { icon: ShieldCheck, label: 'Reliable, day after day', img: imgReliable, alt: 'Bright, well-organised server room' },
      { icon: TrendingUp, label: 'Ready to grow with you', img: imgGrow, alt: 'Engineer with a laptop beside server racks' },
    ],
  },
  cta: {
    title: 'Planning new hardware or a site move?',
    sub: 'We’ll design your infrastructure around your business — now and for the next five years.',
    primaryLabel: 'Get a quote',
  },
}

export default function Hardware() {
  return <ServicePage page={PAGE} />
}
