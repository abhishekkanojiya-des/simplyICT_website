import { Clock, MessagesSquare, ShieldCheck } from 'lucide-react'
import ServicePage from '../components/ServicePage'
import { AI_SERVICES } from '../data/content'
// Photos from Unsplash (free under the Unsplash License):
// strategy photo-1758691736407-02406d18df6c
// copilot photo-1603195827187-459ab02554a0 · chatbots photo-1684369175833-4b445ad6bfb5
// automation photo-1787839253728-f6d42c2cfb8c · insights photo-1763038311036-6d18805537e5
// governance photo-1709120395858-92f1c7c577f5 · hours photo-1781246435700-afec19012b45
// safe photo-1758626104169-6835c0bd03e3 · plain photo-1694903089438-bf28d4697d9a
import heroImg from '../assets/services/ai_header.jpg'
import imgStrategy from '../assets/ai/strategy.jpg'
import imgCopilot from '../assets/ai/copilot.jpg'
import imgChatbots from '../assets/ai/chatbots.jpg'
import imgAutomation from '../assets/ai/automation.jpg'
import imgInsights from '../assets/ai/insights.jpg'
import imgGovernance from '../assets/ai/governance.jpg'
import imgHours from '../assets/ai/hours.jpg'
import imgSafe from '../assets/ai/safe.jpg'
import imgPlain from '../assets/ai/plain.jpg'

/* No live AI page exists yet — copy is built from the homepage AI card and nav. */

const VISUALS = {
  'ai-strategy': { img: imgStrategy, focus: '40% 40%', alt: 'Consultant presenting data on a large screen to colleagues', chip: 'Clear, costed roadmap' },
  copilot: { img: imgCopilot, focus: '50% 40%', alt: 'Team learning a new tool together on a laptop', chip: 'Copilot for Microsoft 365' },
  chatbots: { img: imgChatbots, focus: '50% 50%', alt: 'Friendly AI assistant robot working at a laptop', chip: 'Available 24/7' },
  automation: { img: imgAutomation, focus: '50% 60%', alt: 'Task board on a laptop showing work moving through stages', chip: 'Less repetitive admin' },
  'data-insights': { img: imgInsights, focus: '60% 50%', alt: 'Person reviewing charts and dashboards on a laptop', chip: 'Plain answers from your data' },
  'ai-governance': { img: imgGovernance, focus: '50% 50%', alt: 'AI letters on a circuit board', chip: 'Safe, compliant AI use' },
}

const PAGE = {
  crumb: 'AI Services',
  tagline: 'AI Services',
  title: ['AI', 'Services'],
  hero: {
    img: heroImg,
    focus: '60% 30%',
    text: 'Practical AI that saves your team hours every week — rolled out safely, explained in plain English, and supported by people you can talk to.',
  },
  explore: {
    title: 'Six ways to put AI to work',
    text: 'From a clear strategy to everyday tools your team will actually use — start with one, and we’ll help you build from there.',
  },
  services: AI_SERVICES.map((s) => ({ ...s, ...VISUALS[s.id] })),
  why: {
    eyebrow: 'Why AI, why now',
    title: 'Less busywork. More time for the work that matters.',
    text: 'AI is already changing how small teams work. We help you find where it genuinely pays off, set it up safely around your data, and train your people so it sticks — no hype, no jargon.',
    cta: 'Talk to us',
    pillars: [
      { icon: Clock, label: 'Saves your team hours every week', img: imgHours, alt: 'Laptop showing business charts on a sunny desk' },
      { icon: ShieldCheck, label: 'Rolled out safely', img: imgSafe, alt: 'Laptop showing an AI integration screen' },
      { icon: MessagesSquare, label: 'Explained in plain English', img: imgPlain, alt: 'Human and robot hands reaching towards the letters AI' },
    ],
  },
  cta: {
    title: 'Ready to put AI to work?',
    sub: 'Free consultation. No hype — just honest advice on where AI can help your business.',
    primaryLabel: 'Book a free consultation',
  },
}

export default function AIServices() {
  return <ServicePage page={PAGE} />
}
