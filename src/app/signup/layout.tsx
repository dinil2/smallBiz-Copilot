import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started Free",
  description: "Create your free SmallBiz Copilot account. Instant onboarding with business-specific AI analytics for retail shops, cafes, pharmacies, and SMEs.",
  alternates: {
    canonical: "/signup",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
