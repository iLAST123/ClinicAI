interface OnboardingStepProps {
  title: string
  description: string
  children: React.ReactNode
}

export function OnboardingStep({
  title,
  description,
  children,
}: OnboardingStepProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 grid gap-5">{children}</div>
    </div>
  )
}
