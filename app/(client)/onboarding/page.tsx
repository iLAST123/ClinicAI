import type { Metadata } from "next"

import { OnboardingWizard } from "./wizard"

export const metadata: Metadata = {
  title: "Onboarding — ClinicAI",
  description: "Configure sua clínica em 5 etapas.",
}

export default function OnboardingPage() {
  return <OnboardingWizard />
}
