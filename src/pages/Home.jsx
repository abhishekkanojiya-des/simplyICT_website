import Hero from '../sections/Hero'
import Services from '../sections/Services'
import { StatsBand, WhyUs, Process } from '../sections/Middle'
import { CTA } from '../sections/CTAFooter'
import { ScrollProgress } from '../components/ui'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <StatsBand />
      <Services />
      <WhyUs />
      <Process />
      <CTA />
    </>
  )
}
