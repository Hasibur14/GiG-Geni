import { BenefitsSection } from "@/components/home/BenifitSection"
import { CompetitionFlow } from "@/components/home/CompetitionFlow"
import { Hero } from "@/components/home/Hero"
import { Roadmap } from "@/components/home/RoadMap"
import { UpcomingFeatures } from "@/components/home/UpcomingFeatures"
import { WaitlistSection } from "@/components/home/WaitlistSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - GiG Geni",
  description: "Welcome to GiG Geni - Your competition platform for career growth",
}

export default function HomePage() {
  return (
    <div className="">
     <Hero />
      <BenefitsSection />
       <CompetitionFlow /> 
      <Roadmap />
      <UpcomingFeatures />
      <WaitlistSection />
    </div>
  )
}